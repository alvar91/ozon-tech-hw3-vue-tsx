<script lang="tsx">
import { VNode } from "vue";
import { Vue, Component } from "vue-property-decorator";

import { User, MainUserInfo } from "@/types/user";
import { HandleInputChange, HandleChange } from "@/types/events";

import Header from "@/components/header.vue";
import MainContainer from "@/components/main-container.vue";
import Aside from "@/components/aside.vue";
import Card from "@/components/card.vue";

import { api } from "../api";

@Component({
  name: "MainView",
})
export default class MainView extends Vue {
  private filterKeyword: string = "";
  private users: User[] = [];
  private currentUserId: string = "";

  private async loadData(): Promise<void> {
    const data = await api.getUsers();
    this.users = data;
  }

  private setFilterKeyword(evt: HandleInputChange): void {
    const value = evt.target.value;
    this.filterKeyword = value.toLowerCase();
  }

  private setCurrentUser(evt: HandleChange): void {
    evt.preventDefault();
    const $value: HTMLElement | null = evt.target.closest("[data-id]");
    if ($value === null) return;

    const userId = $value.dataset.id;

    if (userId !== undefined) this.currentUserId = userId;
  }

  created(): void {
    this.loadData();
  }

  private get filteredUsers(): User[] {
    return this.filterKeyword
      ? this.users.filter(
          ({ firstName, middleName, lastName }: MainUserInfo) => {
            return (
              firstName.toLowerCase().includes(this.filterKeyword) ||
              middleName.toLowerCase().includes(this.filterKeyword) ||
              lastName.toLowerCase().includes(this.filterKeyword)
            );
          }
        )
      : this.users;
  }

  private get currentUser(): User | undefined {
    if (this.currentUserId === "") return this.users[0];

    return this.users.find((user) => user.id === this.currentUserId);
  }

  render(): VNode {
    if (this.users.length === 0) {
      return (
        <div>
          <Header />
          <MainContainer>
            <div>Загрузка данных, подождите...</div>
          </MainContainer>
        </div>
      );
    }

    return (
      <div>
        <Header />
        <MainContainer>
          <Aside
            users={this.filteredUsers}
            on={{
              setFilterKeyword: (evt: HandleInputChange) =>
                this.setFilterKeyword(evt),
              setCurrentUser: (evt: HandleChange) => this.setCurrentUser(evt),
            }}
          />
          <Card currentUser={this.currentUser} />
        </MainContainer>
      </div>
    );
  }
}
</script>
