<script lang="tsx">
import { VNode } from "vue";
import { Vue, Component, Prop } from "vue-property-decorator";

import { User } from "@/types/user";
import { HandleChange } from "@/types/events";

import AsideList from "@/components/aside-list.vue";

@Component({
  name: "Aside"
})
export default class Aside extends Vue {
  @Prop({ required: true, default: [] }) readonly users!: User[];

  render(): VNode {
    const { $style, users, $listeners } = this;
    const { setFilterKeyword, setCurrentUser } = $listeners;

    return (
      <aside class={$style.aside}>
        <form action="#" class={$style.aside__form}>
          <fieldset class={$style.aside__fieldset}>
            <button
              class={$style.aside__search}
              type="submit"
              aria-label="Поиск по сайту"
            ></button>
            <input
              class={$style.aside__input}
              type="search"
              name="search"
              placeholder="Поиск"
              on={{ input: setFilterKeyword }}
            />
          </fieldset>

          <button
            class={$style.aside__filter}
            type="button"
            aria-label="Фильтр поиска"
          ></button>
        </form>

        <AsideList
          users={users}
          on={{
            setCurrentUser: (evt: HandleChange) => setCurrentUser(evt),
          }}
        />
      </aside>
    );
  }
}
</script>

<style module>
.aside {
  width: 334px;
  margin-right: var(--main-mr);
  margin-bottom: var(--main-mb);
}

.aside__form {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border-dark);
  padding: var(--main-horizontal);
  border-radius: 8px 8px 0 0;
  background-color: var(--main-light);
}

.aside__input {
  align-self: center;
  padding: 0;
  padding-left: 8px;
  width: 196px;
  outline: none;
  border: none;
  background-color: transparent;
}

.aside__fieldset {
  display: flex;
  margin: 0;
  padding: 10px;
  min-height: 44px;
  border: none;
  border-radius: 8px;
  background-color: var(--main-grey);
}

.aside__search {
  width: 24px;
  height: 24px;
  border: none;
  background: url("@/assets/images/search.svg");
  cursor: pointer;
}

.aside__filter {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 8px;
  background: url("@/assets/images/filter.svg");
  cursor: pointer;
}

@media (max-width: 1440px) {
  .aside {
    width: 100%;
  }
}
</style>
