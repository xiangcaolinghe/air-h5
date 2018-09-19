<template>
  <div>
    <br>
    <div class="contain">
      <ul class="current_position">
        <li>当前位置：</li>
        <li><a href="/">首页</a>&nbsp;&nbsp;</li>
        <li><i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;</li>
        <li><a href="/news/list">新闻</a></li>
        <li>&nbsp;&nbsp;<i class="icon iconfont icon-youjiantou"></i>&nbsp;&nbsp;&nbsp;</li>
        <li><a href="/news/details">详情</a></li>
      </ul>
    </div>
    <br/>
    <div class="title_hr">
      <div class="banner_hr">
        <div class="bar_hr"></div>
      </div>
    </div>
    <br/>
    <div class="news_tails">
      <div class="news_title">
        {{datail.title}}
      </div>
      <br/><br/>
      <div class="dis">
        <span>作者：{{datail.author}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>发布时间：{{datail.time}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <span>来源：{{datail.origin}}</span>
      </div>
      <br/><br/>
      <div class="detail_content" v-html="datail.content">
      </div>
      <br/><br/>
      <div class="down_res">
        <a href="datail.download_url" style="color: #df6657;text-align: left;">{{datail.download_name}}</a>
      </div>
      <br/><br/><br/>
    </div>
  </div>
</template>

<script>
    export default {
        //name: "details.vue"
      data(){
        return{
          datail:{}
        }
      },
      mounted: function () {
        this.getDetail();
      },
      methods:{
        getDetail(){
          /*$http.ajax({
            type: 'post',
            url: '',
            data: {},
            success: function (data) {

            },
            error: function (error) {

            }
          })*/
          this.datail={
            title: '西北空管局管制中心开展复盘分析持续改进航班正常工作',
              author: '空域中心',
              time: '2018-08-08 12:20',
              origin: '民航空管局',
              download_name: '关于更新班机航线密钥证书等事宜的通知.doc',
              download_url: '/utils/upload.js',
              content: '<table width="1024" border="0" align="center" cellpadding="0" cellspacing="0">\n' +
            '        <tr align="center" valign="middle">\n' +
            '            <td height="196" align="center" valign="top">\n' +
            '                <table width="100%" border="0" align="center" cellpadding="0" cellspacing="0" >\n' +
            '                    <tr>\n' +
            '                        <td align="center" height="10" style="width: 100%" valign="top">\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                    <tr>\n' +
            '                        <td height="20" style="width: 100%; height: 500px" valign="top">\n' +
            '                            <table width="85%" border="0" align="center" cellpadding="0" cellspacing="0"\n' +
            '                                height="200px">\n' +
            '                                <tr>\n' +
            '                                    <td valign="top" style="line-height: 200%; width: 850px; height: 200px;" color="Black"\n' +
            '                                        align="left" class="word">\n' +
            '                                       \n' +
            '                                            <span id="Content" TextAlign="middlecenter" style="color:Black;"><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt">为了进一步巩固良好的航班正常工作态势，2018年8月2日，西北空管局管制中心组织召开航班正常性复盘分析会议，汲取工作经验，持续改进航班正常工作。</p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt"><br></p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt">2018年上半年以来，西北空管局管制中心主动作为，承接咸阳机场运管委战略解码指标，努力促进航班正常性工作，取得了良好成绩，西安咸阳国际机场放行正常率达到92.21%，始发正常率达92.18%，两项指标均位列全国同级机场第一。同时，咸阳机场离港航班正常率达83.99%，平均滑入时间、平均滑出时间、关舱门平均等待时间较去年同期均有明显缩短，咸阳机场整体运行效率和旅客的出行体验均获得显著提升。</p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt"><br></p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt">为了巩固良好的航班正常工作态势，管制中心组织流量管理室和区域管制中心分别就7月27日，7月29日军航活动的协调、流量管理措施的发布以及对航班正常性的影响等进行了复盘，通过两次同样军航活动的处置对比，汲取工作经验并研究改进措施。</p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt"><br></p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt">通过此次复盘会，管制中心主动就改进航班正常性工作提出意见：一是一线运行部门在提出流量管理措施的建议时，一定要有较为充分的数据支持；二是流量管理部门对运行单位提出的流控建议要科学评估，该组织流量管理会商的一定要组织会商；三是遇有军航活动要充分协调，明确活动性质、避让方案的水平和垂直范围；四是尽可能争取可用空域，以便采取雷达引导方案；五是各运行单位接到军航运输机计划，前期一定要充分评估对本单位的影响，必要时向流量管理室申请会商，共同研究措施；六是发布流量管理措施要要素齐全、用语标准、含义明确；七是如果无法制定有效措施以避免对正常性的影响，应及时上报上级单位；八是要做好信息通报工作。</p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt"><br></p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt">通过开展典型航班正常处置工作复盘会议，管制中心强化了各级人员遵守规章制度的责任意识，在如何保障和提高航班正常性工作方面达成了共识，促进各方履责尽责，为管制中心进一步做好暑运期间航班正常性保障工作奠定了良好的基础。</p><p style="TEXT-JUSTIFY: inter-ideograph; TEXT-ALIGN: justify; LINE-HEIGHT: 1.5; MARGIN-TOP: 0px; TEXT-INDENT: 2em; FONT-FAMILY: 宋体; MARGIN-BOTTOM: 0px; FONT-SIZE: 12pt"><br></p></span>\n' +
            '                                        \n' +
            '                                    </td>\n' +
            '                                </tr>\n' +
            '                            </table>\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                </table>\n' +
            '            </td>\n' +
            '    </table>\n'
          }

        }
      }
    }
</script>

<style lang="less" scoped>
  @import '../../assets/styles/list_details.less';
</style>
