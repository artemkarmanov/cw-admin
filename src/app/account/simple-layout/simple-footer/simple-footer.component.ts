import {ChangeDetectionStrategy, Component} from '@angular/core';

export enum FooterLink {
  Terms = 'terms-of-use',
  Privacy = 'privacy-policy',
  About = 'about us',
  Contact = 'contact-us'
}

type Link = {
  title: string
  link: FooterLink
}

@Component({
  selector: 'cwb-simple-footer',
  templateUrl: './simple-footer.component.html',
  styleUrls: ['./simple-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleFooterComponent {
  public links: ReadonlyArray<Link> = [
    {
      title: 'Website Terms of Use',
      link: FooterLink.Terms
    },
    {
      title: 'Privacy Policy',
      link: FooterLink.Privacy
    },
    {
      title: 'About Us',
      link: FooterLink.About
    },
    {
      title: 'Contact Us',
      link: FooterLink.Contact
    }
  ]
}
