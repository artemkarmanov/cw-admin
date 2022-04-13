import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Router} from '@angular/router';
import {BreadCrumbsService} from '@services/bread-crumbs.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "@env";
import {forkJoin, Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {UserState} from "@store/user.state";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {Select} from "@ngxs/store";
import {IUser} from "@interfaces/user.interfaces";

@Component({
	selector: 'cwb-create',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {
	@Select() public users$!: Observable<IUser[]>
	public isAdmin = environment.role === 'admin';
	secondFormGroup = new FormGroup({
		audioDetails: new FormControl(null),
		captionDispDetails: new FormControl('Captions can be viewed in the CaptionWorks viewer')
	});
	thirdFormGroup = new FormGroup({
		requirePasscode: new FormControl(null),
		requireLogin: new FormControl(null),
		viewerEmails: new FormControl(null),
		authorizedViewersOnly: new FormControl()
	});
	@SelectSnapshot(UserState.userTimeZone) private userTimeZone!: string
	firstFormGroup = new FormGroup({
		title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
		startDate: new FormControl(new Date(), [Validators.required]),
		duration: new FormControl(60, [Validators.required, Validators.min(15)]),
		timeZoneOverride: new FormControl(this.userTimeZone),
		countWeeks: new FormControl(1, [Validators.required, Validators.min(1)]),
		oboUserId: new FormControl(null, []),
		allowOverrun: new FormControl(null)
	});

	constructor(
		private router: Router,
		private breadCrumbsService: BreadCrumbsService
	) {

	}

	ngOnInit(): void {
		if (this.isAdmin) {
			this.getUsers()
		}

		forkJoin([
			this.firstFormGroup.valueChanges,
			this.secondFormGroup.valueChanges,
			this.thirdFormGroup.valueChanges
		])
			.pipe(tap(console.log))
			.subscribe()

		this.breadCrumbsService.set([
			{
				path: '/bookings',
				title: 'Bookings'
			},
			{
				title: 'New booking',
				path: ['bookings', 'create'].join('/')
			}
		])
	}

	@Dispatch()
	getUsers() {
		return new Send({type: MessageType.GetUsers})
	}

	@Dispatch()
	send() {
		return new Send({
			type: MessageType.CreateBooking,
			data: {
				...this.firstFormGroup.value,
				...this.secondFormGroup.value,
				...this.thirdFormGroup.value
			}
		})
	}
}
