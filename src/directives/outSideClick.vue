<script>
let handleOutsideClick;
export default {
  priority: 700,
  name: "outSideClick",
  bind(el, binding, vnode) {
    handleOutsideClick = (e) => {
      e.stopPropagation();
      const handler = binding.value;

      if (!el.contains(e.target)) {
        el.dispatchEvent(new Event("out-click"));
      }
    };

    document.addEventListener("click", handleOutsideClick);
  },

  unbind() {
    document.removeEventListener("click", handleOutsideClick);
  },
};
</script>