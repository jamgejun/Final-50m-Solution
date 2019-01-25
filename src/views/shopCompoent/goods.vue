<template>
    <section>
        <el-table :data="goodsList">

        </el-table>
    </section>
</template>

<script>
    import { getGoods, removeGoods, changeGoods , addGoods } from '../../api'
	export default {
        data () {
            return {
                goodsList: []
            }
        }
    }
</script>

<style lang='scss'>
	
</style>