import { useStore } from "vuex";
import { computed } from "vue";
import { remove, save } from "@/assets/js/array-store";
import { FAVORITE_KEY } from "@/assets/js/constant";

export function useFavorite() {
  const store = useStore();
  const MAX_LEN = 100;
  const favoriteList = computed(() => {
    return store.state.favoriteList;
  });
  function favoriteIcon(song) {
    return isFavorite(song) ? "icon-favorite" : "icon-not-favorite";
  }
  function isFavorite(song) {
    return favoriteList.value.findIndex((item) => item.id === song.id) !== -1;
  }
  function toggleFavorite(song) {
    function compare(item) {
      return item.id === song.id;
    }
    let list;
    if (isFavorite(song)) {
      list = remove(FAVORITE_KEY, compare);
    } else {
      list = save(song, FAVORITE_KEY, compare, MAX_LEN);
    }
    store.commit("setFavoriteList", list);
  }

  return {
    favoriteIcon,
    toggleFavorite,
  };
}
