<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Tasks</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.task-modal>New Tasks</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <!--th scope="col">Date</th-->
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Done?</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key=index>
              <!--td>{{task.date}}</td-->
              <td>{{task.name}}</td>
              <td>{{task.description}}</td>
              <td>
                <span v-if="task.done">Yes</span>
                <span v-else>No</span>
              </td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-warning btn-sm">Edit</button>
                  <button type="button" class="btn btn-danger btn-sm">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <b-modal ref="addTaskModal" id="task-modal" title="Add a new Task" hide-footer>
      <b-form @submit="onSubmit" @reset="onReset" class="w-100">
        <b-form-group id="form-name-group" label="Name:" label-for="form-title-input">
          <b-form-input id="form-name-input" type="text"
            v-model="addTask.name"
            required placeholder="Task Name">
          </b-form-input>
        </b-form-group>
        <b-form-group id="form-description-group"
          label="Description:"
          label-for="form-description-input">
          <b-form-input id="form-description-input"
            type="text" v-model="addTask.description"
            required placeholder="Task Description">
          </b-form-input>
        </b-form-group>
         <b-form-group id="form-done-group">
          <b-form-checkbox-group v-model="addTask.done" id="form-checks">
            <b-form-checkbox value="true">Done?</b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

const host = 'http://localhost:5000';
// const host = 'https://tasksnodeapp.herokuapp.com';

export default {
  data() {
    return {
      tasks: [],
      addTask: {
        name: '',
        description: '',
        done: [],
      },
    };
  },
  methods: {
    getTasks() {
      const path = 'https://tasksnodeapp.herokuapp.com/tasks';
      axios.get(path).then((res) => {
        this.tasks = res.data;
        console.log(res.data.tasks);
      }).catch((e) => {
        console.error(e);
      });
    },
    addTaskfn(payload) {
      const path = `${host}/tasks`;
      axios.post(path, payload).then(() => {
        this.getTasks();
      }).catch((error) => {
        console.error(error);
        this.getTasks();
      });
    },
    initForm() {
      this.addTask.name = '';
      this.addTask.description = '';
      this.addTask.done = [];
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addTaskModal.hide();
      let done = false;
      if (this.addTask.done[0]) done = true;
      const payload = {
        name: this.addTask.name,
        description: this.addTask.description,
        done,
      };
      this.addTaskfn(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addTaskModal.hide();
      this.initForm();
    },
  },
  created() {
    this.getTasks();
  },
};
</script>

<style>

</style>
