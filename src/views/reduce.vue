<template>
  <div class="list">
    <br/><br/>
    <div class="contain">
      <div class="current_header">
        <span class="plan">节能减排</span><span class="current_plan">{{currentPlanName}}</span>
      </div>
      <br/><br/>
      <ul class="current_banner">
        <li><a @click="switcher(1)" class="banner_color" :class="{active:isActive == 1}"><span>当前临时航线状况</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-paly icon-postion"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(2)" class="banner_color" :class="{active:isActive == 2}"><span>各地区临时航线使用情况公告</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-paly icon-postion"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(3)" class="banner_color" :class="{active:isActive == 3}"><span>全国临时航线使用情况的通报</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-paly icon-postion"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(4)" class="banner_color" :class="{active:isActive == 4}"><span>临时航线管理办法</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-paly icon-postion"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(5)" class="banner_color" :class="{active:isActive == 5}"><span>临时航线勘误表格下载</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-paly icon-postion"></i></a></li>
        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
        <li><a @click="switcher(6)" class="banner_color" :class="{active:isActive == 6}"><span>各地区临时航线负责人信息</span>&nbsp;&nbsp;&nbsp;&nbsp;<i class="icon iconfont icon-paly icon-postion"></i></a></li>
      </ul>
    </div>
    <div class="contain">
      <div class="contentList" :class="{active:isActive == this.isActive}">
        <div v-for="(item,index) in list">
          <div class="content-hr"></div>
          <br/><br/><br/>
          <ul class="content">
            <li class="title"><a href="javascript:;">{{item.title}}</a></li>
            <li :class="item.show ? 'contents' : 'limitC'"><a href="javascript:;"  @click="showContent(item,index)">{{item.content}}</a></li>
            <li class="time">{{item.time}}</li>
            <li><br/></li>
          </ul>
          <!--<div v-if="index<list.length-1" class="content-hr"></div>-->
        </div>
        <div class="content-hr"></div>
        <br/><br/>
        <!--分页-->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total=parseInt(total)>
        </el-pagination>
        <br/><br/>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Table,TableColumn,Pagination} from 'element-ui';
  import VueResource from 'vue-resource'
  Vue.use(Table);
  Vue.use(TableColumn);
  Vue.use(Pagination);
  Vue.use(VueResource)
  export default {
    data(){
      return{
        list:[],
        currentPage: 1,      //当前页
        total: 20,          //数据总条数
        pageSize: 10,        //每页显示的数据条数
        month:'',
        day:'',
        week:'',
        changeNoticeList:[],
        temporaryRoutesList:[],
        meetingNoticeList:[],
        isActive:1,
        currentPlanName:'当前临时航线状况'
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      switcher(number){
        if (number===1){
          this.isActive=number;
          this.currentPlanName="当前临时航线状况";
          list=this.changeNoticeList;
        }else if (number===2){
          this.isActive=number;
          this.currentPlanName="各地区临时航线使用情况公告";
          this.temporaryRoutesList=[
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true},
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true},
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true},
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true},
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true},
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true},
            {title: '关于进一步明确海南地区部分航线代号及临时增加班机航线',content: '7月19日，青海空管分局塔台' +
              '管制室正式从进近管制室接管了本场航班的放行权，并开放地面管制席位。塔台管制室在接管本场放行权后，' +
              '可以更加有效地控制本场航班小时容量，更灵活地掌握放行顺序和余度。', time: '2014/1/20 13:22', show: true}
          ];
          this.list=this.temporaryRoutesList;
        }else if (number===3){
          this.isActive=number;
          this.currentPlanName="全国临时航线使用情况的通报";
          this.meetingNoticeList=[
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true},
            {title: '关于新辟并调整海南地区部分航线的通知 ',content: '日本成田机场方面透露称，18日中午，成田机场' +
              '第二航站楼办理登机手续的系统出现故障，各航空公司随后不得不改为人工模式为乘客办理登机手续。受此影响' +
              '第二航站楼出发的部分航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人' +
              '排起了长龙。此外，在个别航空公司柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30',
              show: true}
          ];
          this.list=this.meetingNoticeList;
        }else if (number===4){
          this.isActive=number;
          this.currentPlanName="临时航线管理办法";
          this.meetingNoticeList=[
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},{title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true}

          ];
          this.list=this.meetingNoticeList;
        }else if (number===5){
          this.isActive=number;
          this.currentPlanName="临时航线勘误表格下载";
          this.meetingNoticeList=[
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},{title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true}

          ];
          console.log(this.meetingNoticeList);
          this.list=this.meetingNoticeList;
          console.log(this.list);
        }else if (number===6){
          this.isActive=number;
          this.currentPlanName="各地区临时航线负责人信息";
          this.meetingNoticeList=[
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},{title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true},
            {title: '宁夏空管分局飞行服务室开展安康杯“真情服务”主题辩论赛活动 ',content: '受此影响第二航站楼出发的部分' +
              '航班出现延误。在第二航站楼的出发大厅，各航空公司的柜台前等待办理登机手续的人排起了长龙。此外，在个别航空公司' +
              '柜台前，还挂出了暂时停止办理登机手续的提示牌。', time: '2018/08/18 13:30', show: true}

          ];
          this.list=this.meetingNoticeList;
        }
      },
      showContent(item, index) {
        if (item.show){
          item.show=false;
        }else{
          item.show=true;
        }

      }
    },
    mounted: function () {
      this.changeNoticeList=[
        {title: '甘肃空管分局和甘肃省无线电委员会召开无线电干扰座谈会',content: '成田机场方面称，目前还不清楚系统何时能' +
          '够恢复正常，机场方面正在调查此次故障的原因，同时也在加速系统的恢复工作。', time: '2018/08/18 13:30',
          show: true},
        {title: '甘肃空管分局和甘肃省无线电委员会召开无线电干扰座谈会',content: '成田机场方面称，目前还不清楚系统何时能' +
          '够恢复正常，机场方面正在调查此次故障的原因，同时也在加速系统的恢复工作。', time: '2018/08/18 13:30',
          show: true},
        {title: '甘肃空管分局和甘肃省无线电委员会召开无线电干扰座谈会',content: '成田机场方面称，目前还不清楚系统何时能' +
          '够恢复正常，机场方面正在调查此次故障的原因，同时也在加速系统的恢复工作。', time: '2018/08/18 13:30',
          show: true},
        {title: '甘肃空管分局和甘肃省无线电委员会召开无线电干扰座谈会',content: '成田机场方面称，目前还不清楚系统何时能' +
          '够恢复正常，机场方面正在调查此次故障的原因，同时也在加速系统的恢复工作。', time: '2018/08/18 13:30',
          show: true},
        {title: '甘肃空管分局和甘肃省无线电委员会召开无线电干扰座谈会',content: '成田机场方面称，目前还不清楚系统何时能' +
          '够恢复正常，机场方面正在调查此次故障的原因，同时也在加速系统的恢复工作。', time: '2018/08/18 13:30',
          show: true},
        {title: '甘肃空管分局和甘肃省无线电委员会召开无线电干扰座谈会',content: '成田机场方面称，目前还不清楚系统何时能' +
          '够恢复正常，机场方面正在调查此次故障的原因，同时也在加速系统的恢复工作。', time: '2018/08/18 13:30',
          show: true}
      ];
      this.list=this.changeNoticeList;

    }
  }
</script>

<style lang="less" scoped>
  @import '../assets/styles/list.less';
  .current_header{
    text-align: left;
  }
  .plan{
    font-size: 30px;
    font-weight: bolder;
    color: #da422a;
    float: left;
  }
  .current_plan{
    font-size: 26px;
    font-weight: bolder;
    color: #026ab3;
    margin-left: 11%;
    text-align: left;
  }
  .current_banner{
    font-size: 18px;
    /*font-weight: bold;*/
    display: table-cell;
  }
  .current_banner li{
    text-decoration: none;  /*去掉前面的圆点*/
    list-style: none;
    /*float: left;*///横向排列\
    text-align: left;
  }
  .current_banner li span{
    /*width: 160px;   //(定义宽度)
    white-space: nowrap; //（不换行，一行显示）
    text-overflow: ellipsis;  //（溢出用省略号）
    -o-text-overflow: ellipsis;!*超出部分用...代替*!
    overflow: hidden;   //（多出的文字，隐藏）*/
    display: block;
    width: 160px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .icon-postion{
    position: absolute;
    margin-top: -1.5%;
    margin-left: 140px;
  }
  .current_banner li a {
    text-decoration: none;
    margin: 0px;
  }
  .banner_color{
    color: #999999;
    text-align: left;
  }
  .content-hr{
    background-color: #cccccc;
    padding: 1px 0 0;
    margin-left: 10%;
    width: 80%;
  }
  .contentList{
    display: none;
    margin-top: -36%;
    margin-left: 11%;

  }
  .active{
    color: #da422a;
    display: block;
  }
  .content {
    margin-left: 10%;
    width: 80%;
    text-align: left;
    margin-top: -4%;
  }
  .circle {
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background-color: #da422a;
    margin-left: 220%;
  }
  .shux{
    margin-left: 49px;
    width: 1px;
    height: 190px;
    background: #999999;
  }
  .contents a{
    color: #999999;
  }
  .limitC{
    color: #999999;
    line-height: 28px;
    margin-top: 12px;
    margin-bottom: 12px;
  }
  content ul li a,a:hover{
    text-decoration:none;//去掉下划线
    color:#999;
    cursor: pointer;//光标变小手
  }
</style>
