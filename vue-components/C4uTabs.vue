<template> 
    <div class="tabs-component">
        <ul role="tablist" class="tabs-component-tabs">
            <li
                v-for="(C4uTab, i) in C4uTabs"
                :key="i"
                :class="{ 'is-active': C4uTab.isActive, 'is-disabled': C4uTab.isDisabled }"
                class="tabs-component-tab"
                role="presentation"
                v-show="C4uTab.isVisible"
            >
                <a v-html="C4uTab.header"
                   :aria-controls="C4uTab.hash"
                   :aria-selected="C4uTab.isActive"
                   @click="selectTab(C4uTab.hash, $event)"
                   :href="C4uTab.hash"
                   class="tabs-component-tab-a"
                   role="C4uTab"
                ></a>
            </li>
        </ul>
        <div class="tabs-component-panels">
            <slot/>
        </div>
    </div>
</template>

<script>
    import expiringStorage from './expiringStorage';
    export default {
        props: {
            cacheLifetime: {
                default: 5,
            },
            options: {
                type: Object,
                required: false,
                default: () => ({
                    useUrlFragment: true,
                    defaultTabHash: null,
                }),
            },
        },
        data: () => ({
            C4uTabs: [],
            activeTabHash: '',
            activeTabIndex: 0,
            lastActiveTabHash: '',
        }),
        computed: {
            storageKey() {
                return `vue-tabs-component.cache.${window.location.host}${window.location.pathname}`;
            },
        },
        created() {
            this.C4uTabs = this.$children;
        },
        mounted() {
            window.addEventListener('hashchange', () => this.selectTab(window.location.hash));
            if (this.findTab(window.location.hash)) {
                this.selectTab(window.location.hash);
                return;
            }
            const previousSelectedTabHash = expiringStorage.get(this.storageKey);
            if (this.findTab(previousSelectedTabHash)) {
                this.selectTab(previousSelectedTabHash);
                return;
            }
            if(this.options.defaultTabHash !== null && this.findTab("#" + this.options.defaultTabHash)) {
                this.selectTab("#" + this.options.defaultTabHash);
                return;
            }
            if (this.C4uTabs.length) {
                this.selectTab(this.C4uTabs[0].hash);
            }
        },
        methods: {
            findTab(hash) {
                return this.C4uTabs.find(C4uTab => C4uTab.hash === hash);
            },
            selectTab(selectedTabHash, event) {
                // See if we should store the hash in the url fragment.
                if (event && !this.options.useUrlFragment) {
                    event.preventDefault();
                }
                const selectedTab = this.findTab(selectedTabHash);
                if (! selectedTab) {
                    return;
                }
                if (selectedTab.isDisabled) {
                    event.preventDefault();
                    return;
                }
                if (this.lastActiveTabHash === selectedTab.hash) {
                    this.$emit('clicked', { C4uTab: selectedTab });
                    return;
                }
                this.C4uTabs.forEach(C4uTab => {
                    C4uTab.isActive = (C4uTab.hash === selectedTab.hash);
                });
                this.$emit('changed', { C4uTab: selectedTab });
                this.activeTabHash = selectedTab.hash;
                this.activeTabIndex = this.getTabIndex(selectedTabHash);
                this.lastActiveTabHash = this.activeTabHash = selectedTab.hash;
                expiringStorage.set(this.storageKey, selectedTab.hash, this.cacheLifetime);
            },
            setTabVisible(hash, visible) {
                const C4uTab = this.findTab(hash);
                if (! C4uTab) {
                    return;
                }
                C4uTab.isVisible = visible;
                if (C4uTab.isActive) {
                    // If tab is active, set a different one as active.
                    C4uTab.isActive = visible;
                    this.C4uTabs.every((C4uTab, index, array) => {
                        if (C4uTab.isVisible) {
                            C4uTab.isActive = true;
                            return false;
                        }
                        return true;
                    });
                }
            },
            
            getTabIndex(hash){
                const C4uTab = this.findTab(hash);
               	return this.C4uTabs.indexOf(C4uTab);
            },
            
            getTabHash(index){
            	const C4uTab = this.C4uTabs.find(C4uTab => this.C4uTabs.indexOf(C4uTab) === index);
            	
            	if (!C4uTab) {
					return;
                }
                
                return C4uTab.hash;
			},
            
            getActiveTab(){
            	return this.findTab(this.activeTabHash);
            },
            
			getActiveTabIndex() {
            	return this.getTabIndex(this.activeTabHash);
            },
        },
    };
</script>
