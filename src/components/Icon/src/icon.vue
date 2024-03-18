<script setup lang="ts">
/**
 * @package:
 * @FileFunction:
 * @author:        shenfz
 * @description:   TODO
 * @date:         2024/3/18 19:50
 * @version:      v1.0.0
 */

// type define
interface IIconProps{
  icon: string;
}
// init
const props = defineProps<IIconProps>()
const { icon } = toRefs(props)
//

// init


//

</script>

<template>
   <i :class="`iconfont ${icon}`"></i>
</template>

<style lang="scss" scoped>

</style>