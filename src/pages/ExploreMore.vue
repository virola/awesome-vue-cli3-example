<!-- @format -->

<template>
  <section class="page-module explore-more">
    <div class="module-content">
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="back-tip">返回<a href="/">Vue-Cli3 脚手架模版</a>首页</div>
          <el-table :data="tableData" border stripe highlight-current-row>
            <el-table-column prop="name" label="作品名称" width="120"> </el-table-column>
            <el-table-column prop="address" label="在线地址" width="210">
              <template slot-scope="scope">
                <a :href="scope.row.address" target="_blank" rel="noreferrer noopener">
                  {{ scope.row.address }}
                </a>
              </template>
            </el-table-column>
            <el-table-column
              prop="description"
              label="作品描述"
              show-overflow-tooltip
              min-width="160"
            >
              <template slot-scope="scope">
                <span v-html="scope.row.description"></span>
              </template>
            </el-table-column>
            <el-table-column prop="date" label="上线日期" width="100"> </el-table-column>
            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <div class="operation-area">
                  <el-button
                    type="primary"
                    size="medium"
                    @click="onEditClick(scope.row, scope.$index)"
                  >
                    编辑
                  </el-button>
                  <a
                    :href="scope.row.address"
                    class="heart-link"
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <span class="heart"></span>
                  </a>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-operate">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[20, 50]"
              :page-size="100"
              layout="total, sizes, prev, pager, next"
              :total="1"
            >
            </el-pagination>
          </div>
        </div>
      </div>
      <edit-dialog
        :pdata="currentRowData"
        v-model="isDialogVisible"
        @dispatch-data="onUpdateRowData"
      >
      </edit-dialog>
    </div>
  </section>
</template>

<script>
import EditDialog from '@components/EditDialog';
import metaMixin from '@mixins/metaMixin.js';

export default {
  name: 'ExploreMore',

  mixins: [metaMixin],

  props: {},

  data() {
    return {
      title: '发现更多',
      description: '个人作品集，倾城之链，晚晴幽草轩，静晴轩别苑，天意人间舫，Vue-Cli3 实践参考',
      tableData: [
        {
          name: '倾城之链',
          address: 'https://nicelinks.site/',
          description:
            '倾城之链，作为一个开放平台，旨在云集全球优秀网站，探索互联网中更广阔的世界；在这里，你可以轻松发现、学习、分享更多有用或有趣的事物。',
          date: '2017-09-20',
        },
        {
          name: '晚晴幽草轩',
          address: 'https://jeffjade.com',
          description:
            '个人博客：专注web前端开发和效率工具；也记载关于音乐/电影/旅行等轶事，同时记录下经验总结和人生思考；',
          date: '2014-09-20',
        },
        {
          name: '静晴轩别苑',
          address: 'https://nice.lovejade.cn/',
          description:
            '繁华尽处，寻一无人山谷，建一木制小屋，铺一青石小路，与你晨钟暮鼓，安之若素。',
          date: '2018-05-26',
        },
        {
          name: '吾意静晴轩',
          address: 'https://docz.lovejade.cn/',
          description:
            '吾意静晴轩的诞生，是为了体验采用 Docz 构建 Web 应用程序；同时，为便捷而优雅的创建 Web 应用提供些参考。',
          date: '2018-08-20',
        },
        {
          name: '天意人间舫',
          address: 'https://blog.lovejade.cn/',
          description: '辅助主博客——<a href="https://jeffjade.com">晚晴幽草轩</a>の华丽存在',
          date: '2016-01-20',
        },
        {
          name: 'Vue-Cli3 实践',
          address: 'https://vue-cli3.lovejade.cn/',
          description:
            'Awesome example for rapid Vue.js development using vue-cli3. (vue webpack vuex vue-router vue-i18n element-ui) out of the box.',
          date: '2018-06-01',
        },
      ],
      isDialogVisible: false,
      currentPage: 1,
      currentRowData: {},
      currentRowIndex: -1,
    };
  },

  components: {
    EditDialog,
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  filters: {},

  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(`当前页: ${val}`);
    },
    onUpdateRowData(data) {
      this.currentRowData = data;
      this.$set(this.tableData, this.currentRowIndex, data);
    },
    /* ----------------------------On Click Event---------------------------- */
    onEditClick(rowData, index) {
      this.currentRowData = rowData;
      this.currentRowIndex = index;
      this.isDialogVisible = true;
    },
  },
};
</script>

<style lang="scss">
.explore-more {
  width: 100%;
  max-width: 56rem;
  height: 100vh;
  @include flex-box-center(row);
  margin: 2 * $size-factor auto;
  .module-content {
    width: 100%;
    .back-tip {
      margin: 2 * $size-factor auto;
    }
    .table-operate {
      margin-top: 15px;
    }
    .operation-area {
      @include flex-box-center(row);
    }
    .heart {
      content: '';
      display: block;
      width: 20px;
      min-height: 16px;
      position: relative;
      transform-origin: 50% 50% 0;
    }
    .heart:before {
      content: '';
      display: block;
      width: 10px;
      height: 16px;
      position: absolute;
      top: 0;
      left: 10px;
      border-radius: 10px 10px 0 0;
      background: #f05b72;
      transform: rotateZ(-45deg);
      transform-origin: 0 100% 0;
    }
    .heart:after {
      content: '';
      display: block;
      width: 10px;
      height: 16px;
      position: absolute;
      top: 0;
      left: 0;
      border-radius: 10px 10px 0 0;
      background: #f05b72;
      transform: rotateZ(45deg);
      transform-origin: 100% 100% 0;
    }
    .heart-link {
      display: inline-block;
      margin-left: 15px;
      padding: 10px 20px;
      border-radius: 4px;
      background-color: $brand;
      vertical-align: top;
    }
  }
}

@media (max-width: 768px) {
  .explore-more {
    width: 100%;
    height: 100%;
    max-width: 100%;
    display: block;
  }
}
</style>
