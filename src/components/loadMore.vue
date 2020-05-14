<template>
    <transition-group name="el-zoom-in-bottom">
        <div key="b"
             @click="_currentChange"
             class="loadMore">
            <i class=" el-icon-loading"></i>正在加载</div>
    </transition-group>
</template>

<script>
import Vue from 'vue'
Vue.directive('scroll', {
    bind: function(el, binding) {
        el.addEventListener('scroll', () => {
            // console.log(binding);
            // console.log(el.firstChild.clientHeight, el.scrollTop, el.clientHeight);
            if (el.firstChild.clientHeight - el.scrollTop <= el.clientHeight) {
                console.log(binding, 'binding')
                binding.value()
            }
        })
    }
})
export default {
    name: 'loadMore',
    methods: {
        _currentChange() {
            this.$emit('currentChange')
        }
    }
}
</script>

<style scoped>
.loadMore {
    margin: 20px auto;
    width: 400px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #ff920b;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}
</style>
