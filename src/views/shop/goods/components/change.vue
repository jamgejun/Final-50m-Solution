<template>
    <section>
        <el-form :model="changeForm" label-width="80px" ref="changeForm">
            <el-form :inline="true" label-width="80px">
                <el-form-item label="商品名">
                    <el-input v-model="changeForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品条码">
                    <el-input v-model="changeForm.code" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-width="80px">
                <el-form-item label="卖价">
                    <el-input v-model="changeForm.sellPrice" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="原价">
                    <el-input v-model="changeForm.originalPrice" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-width="80px">
                <el-form-item label="是否热门">
                    <el-select v-model="changeForm.isHot" placeholder="选择显示序号">
                        <el-option value="1" label="是"></el-option>
                        <el-option value="0" label="否"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品状态">
                    <el-select v-model="changeForm.statusName" placeholder="选择商品状态">
                        <el-option label="正常" value="1"></el-option>
                        <el-option label="异常" value="2"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form-item label="商品简介">
                <el-input type="textarea" v-model="changeForm.goodsInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品更多介绍">
                <el-input type="textarea" v-model="changeForm.moreInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品图片">
                <el-upload
                    class="upload-demo"
                    action="http://t159z26789.iask.in/f50m-web/api/goodspictures/"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    :file-list="fileList2"
                    list-type="picture"
                    style="margin-bottom:20px">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer" style="margin-top:20x;">
            <el-button @click.native="GmLock.change = false">取消</el-button>
            <el-button type="primary" @click.native="updateSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
export default {
    props: {
        changeForm: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    }
}
</script>

<style>

</style>
