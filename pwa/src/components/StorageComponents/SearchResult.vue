<template>
  <div class="search-wrapper">
    <label for="search" class="icon icon-search">&#8203;</label>
    <input
      type="text"
      id="search"
      class="search-input"
      placeholder="Search files"
      :value="search"
      @input="$emit('onChanged', $event)"
    />

    <div class="search-count--label" :class="{ show: search !== '' }">
      {{ count }} results
    </div>
  </div>
</template>
<script>
/* LFG */
export default {
  name: "SearchResult",
  props: {
    search: {
      type: String,
      default: "",
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  emits: ["onChanged"],
};
</script>
<style lang="scss">
@import "../../assets/styles/variables.scss";
@import "../../assets/styles/mixins.scss";

.search-wrapper {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 0.8rem;

  .icon-search {
    width: 24px;
    height: 24px;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='%236f6f6f'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    position: absolute;
    top: 8px;
    left: 8px;
  }

  .search-input {
    width: 99%;
    outline: none;
    border: none;
    padding: 0.8rem 0.8rem 0.8rem 2.5rem;
    border-radius: 0.8rem;
    color: $grey-70;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.25s cubic-bezier(0.4, 0, 0.2, 1);

    &:focus {
      background-color: rgba(0, 0, 0, 0.15);
    }
  }

  .search-count--label {
    position: absolute;
    right: 0.6rem;
    background-color: $grey-40;
    color: $grey-80;
    font-size: 0.7rem;
    padding: 7px 12px 5px;
    border-radius: 10px;
    opacity: 0;
    transition: opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    &.show {
      opacity: 1;
    }
  }
}
</style>
