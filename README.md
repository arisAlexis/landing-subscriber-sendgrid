# landing-subscriber-sendgrid
Landing page backend API endpoint working with Sendgrid

## Intro

This helps you to keep the subscribers on a simple landing page on a sendgrid contacts list for later use.  
It solves the problem of hosting your website statically without any scripts running to write the emails to databases or text files.

## Usage

`git clone this repo`  
`npm i`  
`mkdir config; nano config/default.json`  

The default.json file should have these:  
```
{
  "port": "my_port_number",
  "sendgridKey": "your_secret_sendgrid_api_key",
  "list": "your_sendgrid_list_number"
}

```

You can find your list number by uncommenting the lines in app.js and running that function by hitting the endpoint.

Then you need to install the letsencrypt certs (tutorials available online) and make a folder named **keys** under 
the root and paste there `privkey.pem`, `cert.pem` and `chain.pem`.  

Then you can use your favorite daemon such as PM2 and run `pm2 start js/server.js`.  

From your webpage you need to hit the endpoint eg. with jQuery:  
` $.get('https://your_host:8080/fn/subscribe?email='+$('#emailField').val());`

