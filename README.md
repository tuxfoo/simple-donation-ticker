# simple-donation-ticker for nodecg

This is WIP. While you can use this in production, this bundle does not do any sort of user input validation on the form; an incorrect value could result in the donation's not appearing. It is recommended that you only run one instance of index.html at a time.

Contributions and improvements are welcome.

Display's information about tips/donations. Currently it displays the total amount tipped overall or the most recent depending on what you select.
There will be multiple layouts and customisation options.

This bundle is only responsible for creating and rendering a list of tippers. The events will be triggered/activated by other bundles/software/scripts/bots using a rest API.

## How to send donations using cURL

Make sure to replace the username and amount
```
curl -X POST -H "Content-Type:application/json" http://localhost:9090/simple-donation-ticker/ticker -d '{"name":"foobar", "amount": 5 }'
```

## How to send donations using invoke-webrequest (WINDOWS PowerShell)
Make sure to replace the username and amount
```
invoke-webrequest -Uri http://localhost:9090/simple-donation-ticker/ticke -Method POST -Headers @{'Content-Type' = 'application/json; charset=utf-8'} -Body '{"name":"Foobar", "amount": 5 }' -UseBasicParsing
```
