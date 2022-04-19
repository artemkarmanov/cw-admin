import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "@env";
import {Observable} from "rxjs";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {UserState} from "@store/user.state";
import {Dispatch} from "@ngxs-labs/dispatch-decorator";
import {Send} from "@store/websocket.send.actions";
import {MessageType} from "@constants/message-types";
import {Select} from "@ngxs/store";
import {IUser} from "@interfaces/user.interfaces";
import {UsersState} from "@store/users.state";
import * as moment from "moment";
import {SetBreadcrumbs} from "@store/breadcrumbs.actions";

@Component({
	selector: 'cwb-create',
	templateUrl: './create-page.component.html',
	styleUrls: ['./create-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePageComponent {
	@SelectSnapshot(UserState.userTimeZone) userTimeZone!: string
	@Select(UsersState.users) public users$!: Observable<IUser[]>
	public isAdmin = environment.role === 'admin'
	public startTime!: any
	firstFormGroup = new FormGroup({
		title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
		startDate: new FormControl({start: moment(new Date())}, [Validators.required]),
		startTime: new FormControl('00:00', [Validators.required]),
		durationMins: new FormControl(60, [Validators.required, Validators.min(15)]),
		timeZoneOverride: new FormControl(this.userTimeZone),
		countWeeks: new FormControl(1, [Validators.required, Validators.min(1)]),
		oboUserId: new FormControl(null, []),
		allowOverrun: new FormControl(0)
	});

	secondFormGroup = new FormGroup({
		audioDetails: new FormControl('Audio Details'),
		captionDispDetails: new FormControl('Captions can be viewed in the CaptionWorks viewer')
	});

	thirdFormGroup = new FormGroup({
		requirePasscode: new FormControl(0),
		requireLogin: new FormControl(0),
		authorisedViewerEmails: new FormControl(),
		authorisedViewersOnly: new FormControl(0)
	});

	@Dispatch()
	ngOnInit() {
		if (this.isAdmin) this.getUsers()

		return new SetBreadcrumbs([
			{title: 'Bookings', path: '/bookings'},
			{title: 'New booking'}
		])
	}

	@Dispatch() getUsers = () => new Send({type: MessageType.GetUsers})

	@Dispatch()
	createBooking() {
		const {
			title,
			oboUserId,
			countWeeks,
			allowOverrun,
			durationMins,
			startDate,
			startTime
		} = this.firstFormGroup.value

		const {
			requireLogin,
			requirePasscode,
			authorisedViewerEmails,
			authorisedViewersOnly
		} = this.thirdFormGroup.value

		const data = {
			title,
			countWeeks,
			authorisedViewerEmails,
			timeZoneOverride: "Australia/Sydney",
			...this.secondFormGroup.value,
			sessionList: [
				{
					day: moment(startDate.startDate).get('day'),
					startHour: Number(startTime.split(':')[0]),
					startMin: Number(startTime.split(':')[1]),
					durationMins: Number(durationMins)
				}
			],
			startDate: moment(startDate.startDate).format('YYYY-MM-DD'),
			requirePasscode: Number(requirePasscode),
			requireLogin: Number(requireLogin),
			authorisedViewersOnly: Number(authorisedViewersOnly),
			allowOverrun: Number(allowOverrun),
			oboUserId: Number(oboUserId)
		}

		return new Send({type: MessageType.CreateBooking, data})
	}
}
