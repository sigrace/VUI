<template>

	<ul class="v-pagination">
		<li v-if="showTotals">共{{total}}条</li>
		<li @click="prev()">Previous</li>
		<li :class="{'active': currentPage === 1}" @click="changePage(1)">1</li>
		<li class="more" v-if="showPrevButton" @click="fastPrev()"></li>
		<li 
			v-for="page in pagers" 
			:key="page" 
			:class="{'active': currentPage === page}"
			@click="changePage(page)">{{page}}</li>
		<li class="more" v-if="showNextButton" @click="fastNext()"></li>
		<li v-if="allPages > 1" :class="{'active': currentPage === allPages}" @click="changePage(allPages)">{{allPages}}</li>
		<li @click="next()">Next</li>
		<div class="v-pagination__selected">
			<v-select v-model="currentPageSize" style="width: 100px" :options="options">
				<v-option :value="10" label="10页/条"></v-option>
				<v-option :value="20" label="20页/条"></v-option>
			</v-select>
		</div>
		<div class="v-pagination__jumper" v-if="showJumper">
			跳至
			<input 
				class="jumper-input"
				ref="input"
				type="text"
				v-model="jumpToPage"
				@keyup.enter="jumpTo">
			页
		</div>
	</ul>

</template>

<script>
export default {
	data() {
		return {
			currentPage: this.current,
			showPrevButton: false,
			showNextButton: false,
			jumpToPage: 1,
			currentPageSize: this.pageSize,
			options: [{
				value: 10,
				label: '10页/条'
			}, {
				value: 20,
				label: '20页/条'
			}]
		}
	},
	props: {
		total: {
			type: Number,
			default: 0
		},
		current: {
			type: Number,
			default: 1
		},
		pagerCount: {
			type: Number,
			default: 7
		},
		pageSize: {
			type: Number,
			default: 10
		},
		showTotals: Boolean,
		showJumper: Boolean
	},
	watch: {
		currentPageSize() {
			this.currentPage = 1
		}
	},
	computed: {
		allPages() {
			return Math.ceil(this.total / this.currentPageSize)
		},
		pagers() {
			let container = []
			let first
			let {currentPage, pagerCount, allPages, showPrevButton, showNextButton} = this

			let i = allPages > pagerCount ? pagerCount - 2 : allPages - 2
			let startNum = (pagerCount + 1) / 2
			let endNum = allPages - (pagerCount - 1) / 2
			let interval = Math.floor(i / 2)
			
			if(allPages > pagerCount) {
				if(currentPage <= startNum) {
					first = 2
				} else if(currentPage > startNum && currentPage < endNum) {
					first = currentPage - interval
				} else {
					first = endNum - interval
				}
				showPrevButton = currentPage > startNum
				showNextButton = currentPage < endNum
			} else {
				first = 2
				showPrevButton = false
				showNextButton = false
			}

			while(i--) {
				container.push(first + i)
			}
			container.sort((a, b) => a - b)
			this.showPrevButton = showPrevButton
			this.showNextButton = showNextButton

			return container
		}
	},
	methods: {
		changePage(page) {
			this.currentPage = page
			this.jumpToPage = this.currentPage
		},
		prev() {
			this.currentPage = this.currentPage-- <= 1 ? 1 : this.currentPage--
		},
		next() {
			this.currentPage = this.currentPage++ >= this.allPages ? this.allPages : this.currentPage++
		},
		fastPrev() {
			this.currentPage = this.currentPage < this.pagerCount ? 1 : (this.currentPage - this.pagerCount + 1)
		},
		fastNext() {
			this.currentPage = this.currentPage < this.allPages - this.pagerCount - 2  ? this.currentPage + this.pagerCount - 2 : this.allPages
		},
		jumpTo(event) {
			let to = this.jumpToPage.trim()
			let isInteger = (/^[1-9][0-9]*$/).test(to)
			to = Number(to)
			if(isInteger) {
				if(to > this.allPages) to = this.allPages
				if(to < 1) to = 1
			} else {
				to = 1
			}
			this.changePage(to)
		}
	}
}
</script>
