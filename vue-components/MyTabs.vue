<template> 
    <div class="tabs-component">
        <ul role="tablist" class="tabs-component-tabs">
            <li
                v-for="(MyTab, i) in tabs"
                :key="i"
                class="tabs-component-tab"
            >
            x  
            </li>
        </ul>
        <div class="tabs-component-panels">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import bus from "./bus" 

    export default {
        data: () => ({
            tabs: [],
        }),
        methods: {
          addChild(variable) {
             var mk = variable;
             this.tabs.push(variable);
             console.log("ENtry received");
          }
        },
        created() {
            bus.$on('addchild', (v1) => this.addChild(v1));
            //var abc = this.$refs.mYtab;
            //var xyz = this.$slots;
            //var childrenTabs = this.querySelectorAll('my-tab');
            //this.tabs = this.$children;
        },
        mounted() {
   this.$nextTick( function () { 
                bus.$on('addchild', (v1) => this.addChild(v1));
                //var odd = true;
                //var mk = document.querySelectorAll('my-tab');
                //var mk = this.$el.querySelector('.hallo');
                this.tabs.forEach(tab => {
                    tab.isOdd = true;
                });
});
        },

    };
</script>
