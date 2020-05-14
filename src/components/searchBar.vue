<template>
    <div class="topBar">
        <div class="searchBar">
            <input v-model="val"
                   placeholder="请输入"
                   type="text"
                   @keyup.enter="_submit">
            <span v-if="tap"
                  class="search"
                  @click="_go">搜索</span>
            <span v-else
                  class="search"
                  @click="_search">搜索</span>
        </div>
        <p v-if="total"
           class="total clearfix">找到关于
            <span class="ellipsis">
                "{{input}}"
            </span>
            <strong>
                {{total}}
            </strong>条数据
        </p>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
export default {
    name: 'searchBar',
    props: {
        total: {
            type: Number
        },
        tap: {
            type: Boolean
        }
    },
    data() {
        return {
            val: '',
            num: 0
        }
    },
    computed: {
        ...mapState(['input'])
    },
    methods: {
        ...mapMutations(['setInput', 'setNum']),
        _go() {
            if (this.val !== '' && this.val.trim() !== '') {
                this.$router.push('/search')
                this.setInput(this.val)
                this.setNum()
            }
        },
        _search() {
            if (this.val !== '' && this.val.trim() !== '') {
                this.setInput(this.val)
                this.$emit('search', this.val)
            }
        },
        _submit() {
            if (this.$route.name == 'index') {
                this._go()
            } else {
                this._search()
            }
        }
    },
    watch: {
        input() {
            if (this.input) {
                this.val = this.input
            }
        }
    },
    created() {
        this.val = this.input
    }
}
</script>

<style scoped>
.topBar {
    position: relative;
    height: 54px;
    overflow: hidden;
}

.searchBar {
    position: relative;
    width: 400px;
    height: 34px;
    margin: 10px auto;
    overflow: hidden;
    line-height: 34px;
}

.searchBar > input {
    vertical-align: top;
    width: 290px;
    height: 34px;
    padding: 0 90px 0 20px;
    border: none;
    background: rgba(33, 34, 36, 0.6);
    border-radius: 50px;
    color: #fff;
}

.search {
    position: absolute;
    right: 0;
    top: 0;
    width: 78px;
    height: 34px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.1);
    color: #e4e4e4;
    text-align: center;
    cursor: pointer;
}

.search:hover {
    color: #ff920b;
}

.total {
    position: absolute;
    left: 710px;
    top: 18px;
    font-size: 14px;
    color: #e4e4e4;
}

.total > span {
    display: inline-block;
    vertical-align: top;
    max-width: 50px;
}

.total > strong {
    display: inline-block;
    color: #ff920b;
}
</style>
