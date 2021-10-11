public without sharing class SearchAddressByPostCodeController {
    public String PostCode {get;set;}
    public String Address {get;set;}
    public List<SelectOption> AddressOptions {get;set;}

    public SearchAddressByPostCodeController() {
        AddressOptions = new List<SelectOption>();
    }

    public void getAddressByPostCode(){
        String appid = 'dj00aiZpPXNjUE9GQWczN3o4aCZzPWNvbnN1bWVyc2VjcmV0Jng9NzU-';
        String method = 'GET';
        String formattedDateString = (Datetime.now()).format('EEE, dd MMM yyyy HH:mm:ss ') + '+0900';
        HttpRequest req = new HttpRequest();
        req.setMethod(method);
        req.setHeader('Date', formattedDateString);
        req.setEndpoint('https://map.yahooapis.jp/search/zip/V1/zipCodeSearch?query='+this.PostCode+'&appid='+appid+'&output=json');
        req.setHeader('Content-Encoding', 'UTF-8');

        Http http = new Http();
        HTTPResponse res = http.send(req);
        system.debug(res.getBody());
        Map<String, Object> resultJSON = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());

        List<Object> AddressList = (List<Object>)resultJSON.get('Feature');
        if (AddressList.size() == 0) {
            //ここでエラー制御
        } else if (AddressList.size()==1) {
            Map<String,Object> resultProperty = (Map<String,Object>)((Map<String,Object>)AddressList[0]).get('Property');
            String result = (String)resultProperty.get('Address');
            system.debug(result);
            AddressOptions.add(new SelectOption(result,result));
        } else {
            for(Object obj : AddressList){
                Map<String,Object> resultProperty = (Map<String,Object>)((Map<String,Object>)obj).get('Property');
                String result = (String)resultProperty.get('Address');
                AddressOptions.add(new SelectOption(result,result));
            }
        }
    }
}
