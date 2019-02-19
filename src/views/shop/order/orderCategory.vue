<template>
    <section>
        <el-table :data="orderList" v-if="show">
            <el-table-column></el-table-column>
        </el-table>
    </section>
</template>
<script>
  export default {
    props: ['orderList'],
    data() {
      return {
        activeName: 'first',
        orderList: [{}],
        show: true,
        orderByTime: {
            startTime: '',
            endTime: ''
        }
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      handleDayPrev() {

      }
    }
  };
</script>