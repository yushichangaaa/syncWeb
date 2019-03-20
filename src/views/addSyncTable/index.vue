<template>
  <div>
    <el-button type="primary" @click="dialogFormVisible = true">添加任务</el-button>
    <el-dialog :visible.sync="dialogFormVisible" title="添加任务">
      <el-form :model="syncTableData" :label-position="right" label-width="130px">
        <el-form-item label="数据库名称">
          <el-input v-model="syncTableData.dbName"/>
        </el-form-item>
        <el-form-item label="任务类名">
          <el-input v-model="syncTableData.jobClassName"/>
        </el-form-item>
        <el-form-item label="cron表达式">
          <el-input v-model="syncTableData.jobCron"/>
        </el-form-item>
        <el-form-item label="分页">
          <el-input v-model="syncTableData.pageSize"/>
        </el-form-item>
        <el-form-item label="全量更新标识">
          <el-input v-model="syncTableData.fullUpdate"/>
        </el-form-item>
        <el-form-item label="源数据源">
          <el-input v-model="syncTableData.sourceData"/>
        </el-form-item>
        <el-form-item label="源数据表">
          <el-input v-model="syncTableData.sourceTable"/>
        </el-form-item>
        <el-form-item label="源数据源查询SQL">
          <el-input v-model="syncTableData.sourceSQL" type="textarea" autosize/>
        </el-form-item>
        <el-form-item label="增量查询where">
          <el-input v-model="syncTableData.sourceSQLWhere"/>
        </el-form-item>
        <el-form-item label="目标数据源">
          <el-input v-model="syncTableData.targetData"/>
        </el-form-item>
        <el-form-item label="目标数据表">
          <el-input v-model="syncTableData.targetTable"/>
        </el-form-item>
        <el-form-item label="时间间隔">
          <el-input v-model="syncTableData.timeInterval"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false;add()">确 定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="syncTableData2"
      class="manual-table1"
      fit
      element-loading-text="Loading"
      border
      size="mini"
      highlight-current-row
      style="width: 100%">
      <el-table-column prop="dbName" label="数据库名称"/>
      <!--<el-table-column prop="jobClassName" label="任务类名"/>
      <el-table-column prop="jobCron" label="cron表达式"/>
      <el-table-column prop="pageSize" label="分页"/>
      <el-table-column prop="fullUpdate" label="全量更新标识"/>-->
      <el-table-column prop="sourceData" label="源数据源"/>
      <el-table-column prop="sourceTable" label="源数据表" width="250"/>
      <!--<el-table-column prop="sourceSQL" label="源数据源查询SQL" show-overflow-tooltip/>-->
      <el-table-column prop="sourceSQLWhere" label="增量查询where" width="400"/>
      <el-table-column prop="targetData" label="目标数据源"/>
      <el-table-column prop="targetTable" label="目标数据表" width="300"/>
      <el-table-column prop="timeInterval" label="时间间隔"/>
    </el-table>
    <el-pagination
      :current-page.sync="page"
      :page-sizes="[10, 20, 30]"
      :page-size="rows"
      :total="total"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"/>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data() {
    return {
      syncTableData: [],
      syncTableData2: [],
      dialogFormVisible: false,
      syncFormData: {
        dbName: '',
        jobClassName: '',
        jobCron: '',
        pageSize: '',
        fullUpdate: '',
        sourceData: '',
        sourceTable: '',
        sourceSQL: '',
        sourceSQLWhere: '',
        targetData: '',
        targetTable: '',
        timeInterval: ''
      },
      page: 1,
      rows: 10,
      total: 0
    }
  },
  watch: {
    syncTableData: function() {
      this.syncTableData2 = this.syncTableData
    }
  },
  created() {
    this.getSyncTableData()
  },
  methods: {
    handleSizeChange(pageSize) {
      this.rows = pageSize
      this.getSyncTableData()
    },
    handleCurrentChange(currentPage) {
      this.page = currentPage
      this.getSyncTableData()
    },
    open(n) {
      if (n === 20000) {
        this.$message('添加成功')
      } else {
        this.$message('添加失败')
      }
    },
    add() {
      this.$http.post('http://10.10.12.252:8080/TableConfig/add', {
        dbName: this.syncTableData.dbName,
        jobClassName: this.syncTableData.jobClassName,
        jobCron: this.syncTableData.jobCron,
        pageSize: this.syncTableData.pageSize,
        fullUpdate: this.syncTableData.fullUpdate,
        sourceData: this.syncTableData.sourceData,
        sourceTable: this.syncTableData.sourceTable,
        sourceSQL: this.syncTableData.sourceSQL,
        sourceSQLWhere: this.syncTableData.sourceSQLWhere,
        targetData: this.syncTableData.targetData,
        targetTable: this.syncTableData.targetTable,
        timeInterval: this.syncTableData.timeInterval },
      { emulateJSON: true }).then(function(res) {
        this.open(res.data.code)
      })
      this.syncTableData.dbName = ''
      this.syncTableData.jobClassName = ''
      this.syncTableData.jobCron = ''
      this.syncTableData.pageSize = ''
      this.syncTableData.fullUpdate = ''
      this.syncTableData.sourceData = ''
      this.syncTableData.sourceTable = ''
      this.syncTableData.sourceSQL = ''
      this.syncTableData.sourceSQLWhere = ''
      this.syncTableData.targetData = ''
      this.syncTableData.targetTable = ''
      this.syncTableData.timeInterval = ''
    },
    getSyncTableData() {
      this.syncTableData = []
      this.$http.get('http://10.10.12.252:8080/TableConfig/getTasks', { params: { page: this.page, rows: this.rows }}).then(function(res) {
        this.total = res.data.data.total
        var list = res.data.data.list
        for (var i = 0; i < list.length; i++) {
          this.syncTableData.push({
            dbName: list[i].dbName,
            jobClassName: list[i].jobClassName,
            jobCron: list[i].jobCron,
            pageSize: list[i].pageSize,
            fullUpdate: list[i].fullUpdate,
            sourceData: list[i].sourceData,
            sourceTable: list[i].sourceTable,
            sourceSQL: list[i].sourceSQL,
            sourceSQLWhere: list[i].sourceSQLWhere,
            targetData: list[i].targetData,
            targetTable: list[i].targetTable,
            timeInterval: list[i].timeInterval
          })
        }
      }, function(res) {
        alert(res.status + '查询出错了')
      })
    }
  }
}
</script>

<style scoped>

</style>
