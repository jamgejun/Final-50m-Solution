<template>
    <section>
        <el-table :data="myShop">
            <el-table-column prop="name" label="店铺名"></el-table-column>
            <el-table-column prop="status" label="店铺状态">
                <template slot-scope="scope">
                    {{ handleStatus(scope.row.status) }}
                </template>
            </el-table-column>
            <el-table-column prop="startTime" label="打烊开始时间"></el-table-column>
            <el-table-column prop="endTime" label="打烊结束时间"></el-table-column>
            <el-table-column label="操作" width="280">
                <template slot-scope="scope">
                    <el-button type="primary" v-if="!scope.row.status" size="small" @click.native.prevent="reStart(scope.row)">恢复运营</el-button>
                    <el-button type="warning" size="small" @click.native.prevent="handleSmallTimeClose(scope.row)">临时打烊</el-button>
                    <el-button type="danger" size="small" @click.native.prevent="handleAllTimeClose(scope.row)">长期打烊</el-button>
                </template>
            </el-table-column>
        </el-table>
        
        <!-- 临时 -->
        <el-dialog title="临时打烊" :visible.sync="closeLock.smallTime">
            <el-form :data="closeForm" ref="closeForm" :inline="true">
                <el-form-item prop="startTime" label="选择开始时间">
                    <el-date-picker
                        v-model="closeForm.startTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime" label="选择结束时间">
                    <el-date-picker
                        v-model="closeForm.endTime"
                        type="datetime"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('smallTime', 'closeForm')">取消</el-button>
                <el-button type="primary" @click.native="Submit(1,'closeForm')">提交</el-button>
            </div>
        </el-dialog>

        <el-dialog title="长期打烊" :visible.sync="closeLock.allTime">
            <el-form :data="closeForm" ref="closeForm" :inline="true">
                <el-form-item prop="startTime" label="选择开始时间">
                    <span>{{ closeForm.startTime }}</span>
                    <el-date-picker
                        v-model="closeForm.startTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item prop="endTime" label="选择结束时间">
                    <span>{{ closeForm.endTime }}</span>
                    <el-date-picker
                        v-model="closeForm.endTime"
                        type="datetime"
                        placeholder="选择日期时间"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer" style="margin-top:20x;">
                <el-button @click.native="cancer('allTime', 'closeForm')">取消</el-button>
                <el-button type="primary" @click.native="Submit(0,'closeForm')">提交</el-button>
            </div>
        </el-dialog>
    </section> 
</template>

<script>
export default {
    data() {
        return {
            closeLock: {
                smallTime: false,
                allTime: false
            },
            myShop: [
                {
                    name: '重邮商铺',
                    status: 0,
                    startTime: '2019-2-20',
                    endTime: '2019-3-1'
                }
            ],
            closeForm: {
                startTime: '',
                endTime: ''
            }
        }
    },
    methods: {
        handleStatus(status) {
            return status === 0 ?  "打烊中" : "运营中"
        },
        handleSmallTimeClose() {
            let _this = this;
            _this.closeLock.smallTime = !_this.closeLock.smallTime;
        },
        handleAllTimeClose() {
            let _this = this;
            _this.closeLock.allTime = !_this.closeLock.allTime;
        },
        cancer(lock, formName) {
            let _this = this;
            _this.closeLock[lock] = false;
            _this.$refs[formName].resetFields();
        },
        Submit(type, formName) {
            let _this = this;
            alert(_this.closeForm.startTime+'至'+_this.closeForm.endTime);

        },
        reStart(row) {
            let _this = this;
            _this.$confirm('是否恢复运营', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                _this.myShop[0].startTime='';
                _this.myShop[0].endTime='';
                row.status = !row.status;
            }).catch(() => {

            })
        }
    }
}
</script>

<style>

</style>
