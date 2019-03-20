<template xmlns:c="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <div id="aaa" style="width: 1500px;height: 420px"/>
    <hr>
    <ul id="myTab" class="nav nav-tabs">
      <li class="active">
        <a href="#complete" data-toggle="tab">
          成功
        </a>
      </li>
      <li>
        <a href="#error" data-toggle="tab">
          失败
        </a>
      </li>
      <li>
        <a href="#run" data-toggle="tab">
          运行
        </a>
      </li>
      <li>
        <a href="#pause" data-toggle="tab">
          暂停
        </a>
      </li>
      <li>
        <a href="#normal" data-toggle="tab">
          normal
        </a>
      </li>
    </ul>
    <div id="myTabContent" class="tab-content" style="float: left">
      <div id="complete" class="tab-pane fade in active">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr class="text-danger">
              <th class="text-center" style="width: 220px">jobName</th>
              <th class="text-center" style="width: 80px">jobGroup</th>
              <th class="text-center" style="width: 125px">cronExpression</th>
              <th class="text-center" style="width: 93px">jobStatus</th>
              <th class="text-center" style="width: 250px">jobDescription</th>
              <th class="text-center">jobClassName</th>
            </tr>
          </tbody>
        </table>
        <div style="height: 200px;max-height: 200px;overflow-y: scroll">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr v-for="(item,index) in completeArr" :key="index" class="text-center">
                <td style="width: 220px">{{ item.jobName }}</td>
                <td style="width: 80px">{{ item.jobGroup }}</td>
                <td style="width: 125px">{{ item.cronExpression }}</td>
                <td style="width: 93px">{{ item.jobStatus }}</td>
                <td style="width: 250px">{{ item.description }}</td>
                <td>{{ item.jobClassName }}</td>
              </tr>
              <tr v-show="completeArr.length===0">
                <td colspan="6" class="text-center text-muted">
                  <p>no complete job now...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div id="error" class="tab-pane fade">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr class="text-danger">
              <th class="text-center" style="width: 220px">jobName</th>
              <th class="text-center" style="width: 80px">jobGroup</th>
              <th class="text-center" style="width: 125px">cronExpression</th>
              <th class="text-center" style="width: 93px">jobStatus</th>
              <th class="text-center" style="width: 250px">jobDescription</th>
              <th class="text-center">jobClassName</th>
            </tr>
          </tbody>
        </table>
        <div style="height: 200px;max-height: 200px;overflow-y: scroll">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr v-for="(item,index) in errorArr" :key="index" class="text-center">
                <td style="width: 220px">{{ item.jobName }}</td>
                <td style="width: 80px">{{ item.jobGroup }}</td>
                <td style="width: 125px">{{ item.cronExpression }}</td>
                <td style="width: 93px">{{ item.jobStatus }}</td>
                <td style="width: 250px">{{ item.description }}</td>
                <td>{{ item.jobClassName }}</td>
              </tr>
              <tr v-show="errorArr.length===0">
                <td colspan="6" class="text-center text-muted">
                  <p>no error job now...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="run" class="tab-pane fade">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr class="text-danger">
              <th class="text-center" style="width: 220px">jobName</th>
              <th class="text-center" style="width: 80px">jobGroup</th>
              <th class="text-center" style="width: 125px">cronExpression</th>
              <th class="text-center" style="width: 93px">jobStatus</th>
              <th class="text-center" style="width: 250px">jobDescription</th>
              <th class="text-center">jobClassName</th>
            </tr>
          </tbody>
        </table>
        <div style="height: 200px;max-height: 200px;overflow-y: scroll">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr v-for="(item,index) in runArr" :key="index" class="text-center">
                <td style="width: 220px">{{ item.jobName }}</td>
                <td style="width: 80px">{{ item.jobGroup }}</td>
                <td style="width: 125px">{{ item.cronExpression }}</td>
                <td style="width: 93px">{{ item.jobStatus }}</td>
                <td style="width: 250px">{{ item.description }}</td>
                <td>{{ item.jobClassName }}</td>
              </tr>
              <tr v-show="runArr.length===0">
                <td colspan="6" class="text-center text-muted">
                  <p>no run job now...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="pause" class="tab-pane fade">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr class="text-danger">
              <th class="text-center" style="width: 220px">jobName</th>
              <th class="text-center" style="width: 80px">jobGroup</th>
              <th class="text-center" style="width: 125px">cronExpression</th>
              <th class="text-center" style="width: 93px">jobStatus</th>
              <th class="text-center" style="width: 250px">jobDescription</th>
              <th class="text-center">jobClassName</th>
            </tr>
          </tbody>
        </table>
        <div style="height: 200px;max-height: 200px;overflow-y: scroll">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr v-for="(item,index) in pauseArr" :key="index" class="text-center">
                <td style="width: 220px">{{ item.jobName }}</td>
                <td style="width: 80px">{{ item.jobGroup }}</td>
                <td style="width: 125px">{{ item.cronExpression }}</td>
                <td style="width: 93px">{{ item.jobStatus }}</td>
                <td style="width: 250px">{{ item.description }}</td>
                <td>{{ item.jobClassName }}</td>
              </tr>
              <tr v-show="pauseArr.length===0">
                <td colspan="6" class="text-center text-muted">
                  <p>no pause job now...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="normal" class="tab-pane fade">
        <table class="table table-bordered table-hover">
          <tbody>
            <tr class="text-danger">
              <th class="text-center" style="width: 220px">jobName</th>
              <th class="text-center" style="width: 80px">jobGroup</th>
              <th class="text-center" style="width: 125px">cronExpression</th>
              <th class="text-center" style="width: 93px">jobStatus</th>
              <th class="text-center" style="width: 250px">jobDescription</th>
              <th class="text-center">jobClassName</th>
            </tr>
          </tbody>
        </table>
        <div style="height: 200px;max-height: 200px;overflow-y: scroll">
          <table class="table table-bordered table-hover">
            <tbody>
              <tr v-for="(item,index) in normalArr" :key="index" class="text-center">
                <td style="width: 220px">{{ item.jobName }}</td>
                <td style="width: 80px">{{ item.jobGroup }}</td>
                <td style="width: 125px">{{ item.cronExpression }}</td>
                <td style="width: 93px">{{ item.jobStatus }}</td>
                <td style="width: 250px">{{ item.description }}</td>
                <td>{{ item.jobClassName }}</td>
              </tr>
              <tr v-show="normalArr.length===0">
                <td colspan="6" class="text-center text-muted">
                  <p>no normal job now...</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div style="width:1px;border:1px solid red;float: left;height:200px;"><!--这个div模拟一条红色的垂直分割线--></div>
    <!--<div style="float: left"><span>右侧引用接口监控</span></div>-->
  </div>
</template>

<script type="application/javascript">
const success = []
const fail = []
const time = []
export default {
  name: 'App',
  data() {
    return {
      myCount: 0,
      myData1: [],
      mymyData1: [],
      mymymyData1: [],
      a: [],
      str: '',
      myStr: '',
      myData: '',
      myDataArray: [],
      successData: success,
      timeData: time,
      failData: fail,
      completeArr: [],
      errorArr: [],
      runArr: [],
      pauseArr: [],
      normalArr: [],
      option: {
        title: {
          text: '未来一周任务情况'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['成功任务数量', '失败任务数量']
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            // boundaryGap: false,
            data: time
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisLabel: {
              formatter: '{value} 个'
            }
          }
        ],
        series: [
          {
            name: '成功任务数量',
            type: 'line',
            data: success,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          },
          {
            name: '失败任务数量',
            type: 'line',
            data: fail,
            markPoint: {
              data: [
                { name: '失败任务最多', value: 5, xAxis: 3, yAxis: -1.5 }
              ]
            },
            markLine: {
              data: [
                { type: 'average', name: '平均值' }
              ]
            }
          }
        ]
      }
    }
  },
  computed: {
    mySplit() {
      return this.myStr.split(' ')
    }
  },
  watch: {
    successData: function(val, oldVal) {
      this.drawLine()
    },
    mymyData1: function(val, oldVal) {
      this.mymymyData1 = []
      this.push0()
      this.myData1 = this.mymymyData1
    },
    deep: true
  },
  mounted() {
    this.drawLine()
  },
  created() {
    // setInterval(this.getData, 2000)
  },
  methods: {
    getJobInfos() {
      this.$http.post('http://10.10.12.252:8080/api/getAllJobs', { emulateJSON: true }).then(function(res) {
        this.completeArr = []
        this.runArr = []
        this.pauseArr = []
        this.errorArr = []
        this.a = res.data
        for (var i = 0; i < this.a.length; i++) {
          if (this.a[i].jobStatus === 'COMPLETE') {
            this.completeArr.push(this.a[i])
          }
          if (this.a[i].jobStatus === 'ERROR') {
            this.errorArr.push(this.a[i])
          }
          if (this.a[i].jobStatus === 'BLOCKED') {
            this.runArr.push(this.a[i])
          }
          if (this.a[i].jobStatus === 'PAUSED') {
            this.pauseArr.push(this.a[i])
          }
          if (this.a[i].jobStatus === 'NORMAL') {
            this.normalArr.push(this.a[i])
          }
        }
      }, function(res) {
        alert(res.data)
      })
    },
    renderTime(date) {
      var dateee = new Date(date).toJSON()
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    },
    drawLine() {
      const myChart = this.$echarts.init(document.getElementById('aaa'))
      myChart.setOption(this.option)
    },
    fallBackMethod(arr) {
      if (time[time.length - 1] === arr.data[arr.data.length - 1].createTime) {
        success.splice(success.length - 1, 1)
        fail.splice(fail.length - 1, 1)
        success.push(arr.data[arr.data.length - 1].success)
        fail.push(arr.data[arr.data.length - 1].fail)
      } else {
        if (time.length === 7) {
          time.splice(0, 1)
          success.splice(0, 1)
          fail.splice(0, 1)
          time.push(arr[arr.length - 1].createTime)
          success.push(arr[arr.length - 1].success)
          fail.push(arr[arr.length - 1].fail)
        } else {
          time.push(arr[arr.length - 1].date)
          success.push(arr[arr.length - 1].success)
          fail.push(arr[arr.length - 1].fail)
        }
      }
    },
    isNullOrNot(arr) {
      if (time.length === 0) {
        for (var i = 0; i < arr.data.length; i++) {
          time.push(arr.data[i].createTime)
          success.push(arr.data[i].success)
          fail.push(arr.data[i].fail)
        }
      }
      this.fallBackMethod(arr)
    },
    getData() {
      this.getJobInfos()
      this.$http.post('http://10.10.12.252:8080/jobLog/select7Days', { emulateJSON: true }).then(function(res) {
        var arr = res.data
        this.isNullOrNot(arr)
      }, function(res) {
        alert(res.data)
      })
    }
  }
}
</script>
