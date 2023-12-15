<script setup>
import { ref, reactive } from "vue";

// let obj = ref({ count: 1 });
// let proxy = reactive({ count: 1 });

// console.log(obj);
// console.log(proxy);


const myObject = reactive({
  title: 'How to do lists in Vue',
  author: 'Jane Doe',
  publishedAt: '2016-04-10'
})
</script>

<!-- <template>
    <h1 @click="obj.count++">测试！{{ obj.count }}</h1>
    <h1 @click="proxy.count++">测试测试！{{ proxy.count }}</h1>
</template> -->

 <template>
    <ul>
        <li v-for="(value, key, index) in myObject">{{ value }} - {{ key }} - {{ index }}</li>
    </ul>
    <hr>
    <div v-for="n in 4">{{ n }}</div>
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>4</div>
 </template>

<style scoped></style>
