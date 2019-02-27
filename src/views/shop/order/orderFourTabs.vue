<template>
    <section>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="当天" name="first">
                <el-col :span="24">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" @click="handleDayPrev">上一天</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleDayPrev">下一天</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col style="margin-bottom:20px;">
                    <el-col>
                        <span>{{ '某日期的 ' + orderTime }}</span>
                        <span>{{ '订单总数 ' + orderCount }}</span>
                        <el-button type="success" @click="DayLook()" style="margin-left:20px;">点击查看</el-button>
                    </el-col>
                </el-col>
                <el-table :data="orderList" v-if="show">
                    <el-table-column></el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="本周" name="second">
                <el-col :span="24">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" @click="handleDayPrev">上一周</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleDayPrev">下一周</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col style="margin-bottom:20px;">
                    {{ '订单总数' }}
                    <el-button type="success" @click="handleDayPrev" style="margin-left:20px;">点击查看</el-button>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="本月" name="third">
                <el-col :span="24">
                    <el-form :inline="true">
                        <el-form-item>
                            <el-button type="primary" @click="handleDayPrev">上一月</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="handleDayPrev">下一月</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col style="margin-bottom:20px;">
                    {{ '订单总数' }}
                    <el-button type="success" @click="handleDayPrev" style="margin-left:20px;">点击查看</el-button>
                </el-col>
            </el-tab-pane>
            <el-tab-pane label="任意时段" name="fourth">
                <el-form :inline="true">
                    <el-form-item  label="选择开始时间">
                        <span></span>
                        <el-date-picker
                            v-model="orderByTime.startTime"
                            type="datetime"
                            placeholder="选择开始时间"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item prop="endTime" label="选择结束时间">
                        <span></span>
                        <el-date-picker
                            v-model="orderByTime.endTime"
                            type="datetime"
                            placeholder="选择结束时间"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary">查询</el-button>
                    </el-form-item>
                    <el-table :data="orderList" v-if="show">
                        <el-table-column></el-table-column>
                    </el-table>
                </el-form>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>
<script>
  export default {
    props: [''],
    data() {
      return {
        activeName: 'first',
        orderList: [{}],
        show: true,
        orderByTime: {
            startTime: '',
            endTime: ''
        },
        orderTime: '',
        orderCount: 266
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
    }
  };
</script>