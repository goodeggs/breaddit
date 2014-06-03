Open-source, real-time social news site built with [Meteor](http://meteor.com)

# Features
- Real-time 
- Password-based and/or Google auth
- Notifications
- Mobile-ready & responsive
- Invite-only access for reading and/or posting
- Markdown support
- Day by day view

# Installation
- Install [Meteor](http://meteor.com)
- Install [Meteorite](https://github.com/oortcloud/meteorite/)
- Download or clone breaddit into /some/path
- cd /some/path
- Run `mrt`


# First Run
- Fill in your Google keys (by clicking on "Sign Up/Sign in" in your breaddit top bar)
- The first user account created will automatically be made admin
- Check out the settings page and fill out basic things like the site's name

# Local Variables
Meteor uses local environment variables for a few things, such as configuring email. While some platforms (like Modulus) make it easy to configure them from their web dashboard, on a local dev environment the best way is to set up an alias for the `mrt` command. 
For example, to configure Meteor to use Mailgun for email, in your `.bash_profile` file just add:
`alias m='MAIL_URL=smtp://username:password@smtp.mailgun.org:587/ mrt'`

This can also be useful for starting Meteor on a specific port:
`alias m4='MAIL_URL=smtp://username:password@smtp.mailgun.org:587/ mrt --port 4000'`