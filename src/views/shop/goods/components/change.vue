<template>
    <section>
        <el-form :rules="formRules" :model="changeForm" label-width="80px" ref="changeForm">
            <el-form :inline="true" :rules="formRules" label-width="80px">
                <el-form-item label="商品名" prop="name">
                    <el-input v-model="changeForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="商品条码" prop="code">
                    <el-input v-model="changeForm.code" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-width="80px">
                <el-form-item label="卖价" prop="sellPrice">
                    <el-input v-model="changeForm.sellPrice" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="原价" prop="originalPrice">
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
                        <el-option
                            v-for="(item, index) in goodsStatus"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true" label-width="80px">
                <el-form-item label="商品单位">
                    <el-select v-model="changeForm.unit" placeholder="选择商品单位">
                        <el-option 
                        v-for="(item, index) in goodsUnit"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商品分类">
                    <el-select v-model="changeForm.typeId" placeholder="选择商品分类">
                        <el-option
                            v-for="(item, index) in goodsCategory"
                            :key="index"
                            :label="item.name" 
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form-item label="商品简介">
                <el-input type="textarea" v-model="changeForm.goodsInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="商品更多介绍">
                <el-input type="textarea" v-model="changeForm.moreInfo" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="已有图片" v-show="changeFormgoodsOtherPic.length">
                <ul class="el-upload-list el-upload-list--picture-card changePicture">
                    <li 
                    class="el-upload-list__item is-ready" 
                    v-for="(item,index) in changeFormgoodsOtherPic"
                    :key='item'>
                        <img :src="item" alt="" class="el-upload-list__item-thumbnail">
                        <a class="el-upload-list__item-name"></a>
                        <i class="el-icon-close"></i><!---->
                        <span class="el-upload-list__item-actions"><!---->
                            <span class="el-upload-list__item-delete"><i class="el-icon-delete2" @click="deleteImg(index)"></i></span>
                        </span>
                    </li>
                </ul>
            </el-form-item>
            <el-form-item label="新增图片">
                <el-upload
                    action="#"
                    :auto-upload="false"
                    accept="image/png,image/gif,image/jpg,image/jpeg"
                    :multiple="true"
                    list-type="picture-card"
                    :on-change="changFile"
                    limit='20'
                    :on-remove="handleRemove">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
        </el-form>
        <div class="addFormfooter">
            <el-button @click.native="close()">取消</el-button>
            <el-button type="primary" @click.native="updateSubmit">提交</el-button>
        </div>
    </section>
</template>

<script>
import { updateGoods, updatePicture } from '../../../../api/goods/goods.js'
import { getDictorys } from '../../../../api/dictorys/dictorys.js'
export default {
    props: {
        changeForm: {
            type: Object,
            required: true
        }
    },
    mounted: function () {
        let _this = this;
        // 从字典表获取商品状态
        getDictorys(_this, 3).then((res) => {
            _this.goodsStatus = res.data.data
        })
        // 获取商品单位
        getDictorys(_this, 6).then((res) => {
            _this.goodsUnit = res.data.data
        })
        // 获取商品分类
        getDictorys(_this, 11).then((res) => {
            _this.goodsCategory = res.data.data
        })
    },
    data() {
        return {
            goodsStatus: [], // 获取商品的状态
            goodsUnit: [], // 商品的单位
            goodsCategory: [], // 商品的分类
            dialogImageUrl: '',
            dialogVisible: false,
            changeFormgoodsOtherPic: ['http://jwzx.cqu.pt/images/book2.jpg'], // 本地测试的删除图片信息
            PhotoList: [],
            formRules: {
                name: [
                    { required:true, message:'商品名不能为空', trigger: 'blur' },
                    { max: 20, message: '商品名不能超过20位', trigger:'blur change'}
                ],
                code: [

                ]
            }
        }
    },
    methods: {
        // 关闭模态框，并向上级组件通信
        close() {
            let _this = this;
            _this.$emit('changeFormclose')
        },
        handleRemove() {

        },
        // 处理图片删除时的方法
        deleteImg(index) {
            let _this = this;
            _this.$confirm('是否删除该图片？', '提示', {
                type: 'warning'
            }).then(() => {
                // 调用接口，删除图片
                updatePicture(_this, {
                    id: _this.changeForm.goodsOtherPic.id, // 传入删除图片的id
                    goodsId: _this.changeForm.id, // 传入删除图片的商品id
                }).then((res) => {
                    // 删除成功后
                    _this.$message({
                        message: '删除成功！',
                        type: 'success'
                    }).then(() => {
                        // 更新显示视图
                        _this.changeForm.goodsOtherPic.splice(index, 1)
                    })
                })
            }).catch(() => {})
        },
        // 检测图片更改时的情况
        changFile(file, fileList) {
            let _this = this;
            if((file.size/1024/1024) > 5) {
                _this.$message({
                    message: '图片大小不能超过5M！请删除该图片！',
                    type: 'warning'
                })
            } else {
                _this.PhotoList = []
                for( let i=0; i<fileList.length; i++) {
                    _this.PhotoList[i] = fileList[i].raw
                }
            }
        },
        updateSubmit() {
            let _this = this;
            // 更新基本的商品信息
            updateGoods(_this, _this.changeForm.id, {
                name: _this.changeForm.name,
                code: _this.changeForm.code,
                status: _this.changeForm.status,
                sellPrice: _this.changeForm.sellPrice,
                originalPrice: _this.changeForm.originalPrice,
                info: _this.changeForm.info,
                unit: _this.changeForm.unit,
                typeId: _this.changeForm.typeId,
                moreInfo: _this.changeForm.moreInfo,
                displayIndex: _this.changeForm.displayIndex,
                isHot: _this.changeForm.isHot
            }).then((res) => {

                // 设置formData对象，更新图片信息
                let formData = new formData()
                formData.append('goodsId', _this.changeForm.id) // 属于哪个商品的图片
                for( let i = 0 ;i < _this.PhotoList.length; i++) {
                    formData.append('newPic', _this.PhotoList[i]) //存入图片
                }
                formData.append('flag', ) // 是否默认
                updatePicture(_this, formData).then(() => {
                    _this.$message({
                        message: '更新成功！',
                        type: 'success'
                    })
                }).catch(() => {})
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .changePicture {
    }
    .addFormfooter {
        margin-top:20x; 
        margin-bottom: 20px; 
        float: right;
    }
</style>
