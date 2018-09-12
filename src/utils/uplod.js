/*
* uplodImg 方法是前端直传，容易暴露accessKeyId
*
*
* uplodAideo 方法是从后端先获取accessKeyId，
*
*
* */
class uplod {

  uplodImg(url,data,param,callback){

      var reader = new FileReader();
      reader.readAsArrayBuffer(data);
      reader.onload = function (event) {
        var buffer = new OSS.Buffer(event.target.result);
        const client = new OSS.Wrapper({
          accessKeyId: 'LTAIXRJ9U1xLrShA',
          accessKeySecret: 'Fis0wjl4po4KWcoIGRTAEbuX7WsEJC',
          bucket: 'fq-client-browser',
          region: 'oss-cn-beijing'
        })
        const file = buffer;
        var date = new Date();
        var time = ''+date.getFullYear()+(date.getMonth()+1)+(date.getDate());
        var storeAs = time+date.getTime()+'.'+data.type.split('/')[1];
        client.put(storeAs, file, {
        }).then((results) => {
         callback(results)
        }).catch((err) => {
          console.log(err);
        });
      }




  }
  uplodAideo(url,data,param,callback){
    //          oss上传

    var params={};
    for(var  key in param){
      params[key]=param[key]
    }
    API.get('/api/h5/v1/bcat/upload/param', params).then((response) => {
      console.log(response)
      var reader = new FileReader();
      reader.readAsArrayBuffer(data);
      reader.onload = function (event) {
        var buffer = new OSS.Buffer(event.target.result);
        const client = new OSS.Wrapper({
          accessKeyId: response.data.data.accessKeyId,
          accessKeySecret: response.data.data.accessKeySecret,
          stsToken: response.data.data.stsToken,
          bucket: response.data.data.bucket,
          region: response.data.data.region
        })

        const dir = response.data.data.dir;
        const file = buffer;
        var date = new Date();
        var time = ''+date.getFullYear()+(date.getMonth()+1)+(date.getDate());
        var storeAs = time+date.getTime()+'.'+data.type.split('/')[1];
        client.put(dir+storeAs, file, {
        }).then((results) => {
          callback(results)
        }).catch((err) => {
          console.log(err);
        });
      }
    }).catch(function (error) {
      console.log(error);
    });


  }

}
export  default uplod;
