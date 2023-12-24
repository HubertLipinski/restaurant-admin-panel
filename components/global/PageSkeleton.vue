<template>
  <div class="flex items-start flex-col gap-8 mt-6">
    <div class="flex flex-col justify-center gap-y-3 mb-8">
      <USkeleton class="h-4 w-[500px]" />
    </div>
    <div class="flex flex-col justify-center gap-y-3">
      <USkeleton class="h-4 w-[500px]" />
      <USkeleton class="h-4 w-[400px]" />
      <USkeleton class="h-4 w-[200px]" />
    </div>
    <div class="flex flex-col justify-center gap-y-10">
      <USkeleton class="h-4 w-[500px]" />
      <USkeleton class="h-4 w-[500px]" />
      <USkeleton class="h-4 w-[500px]" />
    </div>
    <div class="flex flex-row justify-center gap-8">
      <div class="flex flex-col justify-center gap-y-5">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
      </div>
      <div class="flex flex-col justify-center gap-y-5">
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
        <USkeleton class="h-4 w-[250px]" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
