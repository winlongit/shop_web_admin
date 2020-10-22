<template> 
  <div class="app-container">
    <!-- TODO   搜索框-->
    <!--<el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small">
          查 询
        </el-button>
        <el-button
          style="float: right;margin-right: 15px"
          @click="handleResetSearch()"
          size="small">
          重 置
        </el-button>
      </div>
      <div style="margin-top: 20px">
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <el-form-item label="输入商品名搜索：">
            <el-input style="width: 203px" v-model="listQuery.keyword" placeholder="商品名称"></el-input>
          </el-form-item>
          &lt;!&ndash;
                    <el-form-item label="商品货号：">
                      <el-input style="width: 203px" v-model="listQuery.productSn" placeholder="商品货号"></el-input>
                    </el-form-item>&ndash;&gt;
          <el-form-item label="商品分类：">
            <el-cascader
              clearable
              v-model="selectProductCateValue"
              :options="productCateOptions">
            </el-cascader>
          </el-form-item>
          &lt;!&ndash;          <el-form-item label="商品品牌：">
                      <el-select v-model="listQuery.brandId" placeholder="请选择品牌" clearable>
                        <el-option
                          v-for="item in brandOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="上架状态：">
                      <el-select v-model="listQuery.publishStatus" placeholder="全部" clearable>
                        <el-option
                          v-for="item in publishStatusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="审核状态：">
                      <el-select v-model="listQuery.verifyStatus" placeholder="全部" clearable>
                        <el-option
                          v-for="item in verifyStatusOptions"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>&ndash;&gt;
        </el-form>
      </div>
    </el-card>-->
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>用户列表</span>
      <el-button
        class="btn-add"
        @click="addUserDialogVisible = true"
        size="mini">
        添加用户
      </el-button>
    </el-card>

    <div class="table-container">
      <el-table ref="productTable"
                :data="list"
                style="width: 100%"
                v-loading="listLoading"
                border>
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center">
          <template slot-scope="scope">{{scope.row._id.$oid}}</template>
        </el-table-column>
<!--        <el-table-column label="商品图片" width="120" align="center">-->
<!--          <template slot-scope="scope"><img style="height: 80px" :src="scope.row.swiper_pics[0]"></template>-->
<!--        </el-table-column>-->
        <el-table-column label="用户名称" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.username}}</p>
            <!--            <p>品牌：{{scope.row.brandName}}</p>-->
          </template>
        </el-table-column>
        <el-table-column label="用户类型" align="center">
          <template slot-scope="scope">
            <p>{{scope.row.user_type}}</p>
          </template>
        </el-table-column>

        <!--        TODO 这里一堆功能啊-->
<!--        <el-table-column label="操作" width="160" align="center">-->
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <p>
              <!--  <el-button
                  size="mini"
                  @click="handleShowProduct(scope.$index, scope.row)">查看
                </el-button>
                <el-button
                  size="mini"
                  @click="handleUpdateProduct(scope.$index, scope.row)">编辑
                </el-button>-->
              <el-button v-if="scope.row.user_type!=='agent'"
                size="mini"
                type="success"
                @click="handleRaiseAgent(scope.$index, scope.row)">升级为代理
              </el-button>
            </p>
            <p>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.page_size"
        :page-sizes="[5,10,15]"
        :current-page.sync="listQuery.page"
        :total="total">
      </el-pagination>
    </div>

    <el-dialog
      title="新增用户"
      :visible.sync="addUserDialogVisible"
      width="40%">
      <el-form :model="userForm">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="userForm.userName" autocomplete="off"></el-input>
          </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="userForm.userPwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户类型" :label-width="formLabelWidth">
            <el-select v-model="userForm.userType">
              <el-option label="普通用户" value="consumer"></el-option>
              <el-option label="会员" value="vip"></el-option>
              <el-option label="代理" value="agent"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import {
    fetchList,
    delUser,
    createUser,
    signAsAgent
  } from '@/api/user'


  const defaultListQuery = {
    keyword: null,
    page: 1,
    page_size: 5,
  };
  export default {
    name: "userList",
    data() {
      return {
        listQuery: Object.assign({}, defaultListQuery),
        list: null,
        total: null,
        listLoading: true,
        addUserDialogVisible: false,
        formLabelWidth: '120px',
        userForm:{
          userName: null,
          userPwd: null,
          userType: null
        }
      }
    },
    created() {
      this.getList();
    },
    methods: {
      getList() {
        this.listLoading = true;
        fetchList(this.listQuery).then(response => {
          console.log(response)
          this.listLoading = false;
          this.list = response.result.data;
          this.total = response.result.total;
        });
      },
      handleSearchList() {
        this.listQuery.page = 1;
        this.getList();
      },
      handleAddUser() {
        let that = this
        if (this.userForm.userName === null || this.userPwd === null){
          this.$message({
              message: '用户名和密码不能为空',
              type: 'failed',
              duration: 1000
            });
        }else{// this.$router.push({path: '/pms/addProduct'});
          createUser(Object.assign({},this.userForm)).then(response => {
            this.$message({
              message: '成功',
              type: 'success',
              duration: 1000
            });
            that.addUserDialogVisible = false
            this.getList();
          })
        }
      },
      handleSizeChange(val) {
        this.listQuery.page = 1;
        this.listQuery.page_size = val;
        this.getList();
      },
      handleCurrentChange(val) {
        this.listQuery.page = val;
        this.getList();
      },

      handleResetSearch() {
        this.selectProductCateValue = [];
        this.listQuery = Object.assign({}, defaultListQuery);
      },
      handleRaiseAgent(index,row){
        this.$confirm('是否要将其升级为代理?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          signAsAgent({userId: row._id.$oid}).then(response => {
            this.$message({
              message: '成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
            })
          })
      },
      handleDelete(index, row) {
        console.log(index, row)
        this.$confirm('是否要进行删除操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delUser({userId: row._id.$oid}).then(response => {
            this.$message({
              message: '删除成功',
              type: 'success',
              duration: 1000
            });
            this.getList();
          })
          // 这里是调用了批量删除(修改状态为删除状态)的功能，我这里就不用了，就只删除一个吧
          // let ids = [];
          // ids.push(row.id);
          // this.updateDeleteStatus(1, ids);
        });
      }
    }
  }
</script>
<style></style>


