import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { User } from 'src/app/models/user';
import { AccountService } from 'src/app/services/account.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { Member } from '../../models/member';
import { environment } from 'src/environments/environment';
import { MemberService } from '../../services/member.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Photo } from 'src/app/models/photo';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.css']
})
export class UserProfileEditComponent implements OnInit {

  @ViewChild('detailsForm') detailsForm: NgForm
  @ViewChild('billingForm') billingForm: NgForm

  @HostListener('window:beforeunload', ['event'])
  unloadnotifications($event: any){
    if(this.detailsForm.dirty || this.billingForm.dirty){
      $event.returnValue = true;
    }
  }

  user!: User
  member!: Member

  uploader:FileUploader;
  response:string;

  photoUrl: string

  baseUrl = environment.baseUrl

  constructor(private accountService: AccountService,
              private fb: FormBuilder,
              private memberService: MemberService,
              private snackBar: MatSnackBar,
              private loadingService: LoadingService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => (this.user = user as User))
    this.photoUrl = this.user.photoUrl
   }

  ngOnInit() {
    this.loadMember()
  }

  initializePhotoUploader(){
    const options: FileUploaderOptions = {
      url: this.baseUrl + 'users/upload-photo',
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    }

    this.uploader = new FileUploader(options)

    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false
      this.loadingService.busy()
      this.uploader.uploadAll()
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        this.loadingService.idle()
        const photo:Photo = JSON.parse(response)
        this.photoUrl = photo.url
      }
    }

  }

  loadMember(){
    this.memberService.getMember(this.user.email).subscribe(member => {
      this.member = member
      this.initializePhotoUploader()
    })
  }

  updateMember(){
    this.member.photoUrl = this.photoUrl
    this.user.photoUrl = this.photoUrl
    this.accountService.setCurrentUser(this.user)

    this.memberService.updateMember(this.member).subscribe(() => {
      this.snackBar.open('Saved changes!', 'Close', {
        duration: 3000
      })
     })

     this.loadMember()
  }
}
