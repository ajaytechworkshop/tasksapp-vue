<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Tasks</h1>
        <hr><br><br>
        <alert :message="message" v-if="showMessage"></alert>
        <button type="button" class="btn btn-success btn-sm" v-b-modal.task-modal>New Tasks</button>
        <br><br>
        <table class="table table-hover">
          <thead>
            <tr>
              <!--th scope="col">Date</th-->
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in tasks" :key=index>
              <!--td>{{task.date}}</td-->
              <td>{{task.name}}</td>
              <td>{{task.description}}</td>
              <td>{{task.status}}</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button"
                  class="btn btn-warning btn-sm"
                  v-b-modal.task-update-modal @click="editTaskfn(task)">Edit</button>
                  <button type="button" class="btn btn-danger btn-sm"
                   @click="onDeleteTask(task)">Remove</button>
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
         <b-form-group id="form-status-group" label="Status:"
         label-for="form-status-input">
          <b-form-input id="form-status-input"
            type="text" v-model="addTask.status"
            required placeholder="Task Status">
          </b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Submit</b-button>
        <b-button type="reset" variant="danger">Reset</b-button>
      </b-form>
    </b-modal>
    <b-modal ref="editTaskModal"
         id="task-update-modal"
         title="Update"
         hide-footer>
  <b-form @submit="onSubmitUpdate" @reset="onResetUpdate" class="w-100">
  <b-form-group id="form-name-edit-group"
                label="Name:"
                label-for="form-name-edit-input">
      <b-form-input id="form-name-edit-input"
                    type="text"
                    v-model="editTask.name"
                    required
                    placeholder="Task Name">
      </b-form-input>
    </b-form-group>
    <b-form-group id="form-description-edit-group"
                  label="Description:"
                  label-for="form-description-edit-input">
        <b-form-input id="form-description-edit-input"
                      type="text"
                      v-model="editTask.description"
                      required
                      placeholder="Task Description">
        </b-form-input>
      </b-form-group>
    <b-form-group id="form-status-edit-group"
                  label="Status:"
                  label-for="form-status-edit-input">
       <b-form-input id="form-status-edit-input"
                      type="text"
                      v-model="editTask.status"
                      required
                      placeholder="Task Status">
        </b-form-input>
    </b-form-group>
    <b-button-group>
      <b-button type="submit" variant="primary">Update</b-button>
      <b-button type="reset" variant="danger">Cancel</b-button>
    </b-button-group>
  </b-form>
</b-modal>
  </div>
</template>

<script>
import axios from 'axios';
import Alert from './Alert.vue';

// const host = 'http://localhost:4000';
const host = 'https://tasksnodeapp.herokuapp.com';

export default {
  data() {
    return {
      tasks: [],
      addTask: {
        name: '',
        description: '',
        status: '',
      },
      editTask: {
        name: '',
        description: '',
        status: '',
      },
      message: '',
      showMessage: false,
    };
  },
  components: {
    alert: Alert,
  },
  methods: {
    getTasks() {
      const path = `${host}/tasks`;
      axios.get(path).then((res) => {
        this.tasks = res.data;
        console.log(res.data.tasks);
      }).catch((e) => {
        console.error(e);
      });
    },
    addTaskfn(payload) {
      const path = `${host}/tasks`;
      axios.post(path, payload)
        .then(() => {
          this.getTasks();
          this.message = 'New Task added';
          this.showMessage = true;
        }).catch(() => {
          this.getTasks();
        });
    },
    initForm() {
      this.addTask.name = '';
      this.addTask.description = '';
      this.addTask.status = '';
      this.editTask.name = '';
      this.editTask.description = '';
      this.editTask.status = '';
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.$refs.addTaskModal.hide();
      const payload = {
        name: this.addTask.name,
        description: this.addTask.description,
        status: this.addTask.status,
      };
      this.addTaskfn(payload);
      this.initForm();
    },
    onReset(evt) {
      evt.preventDefault();
      this.$refs.addTaskModal.hide();
      this.initForm();
    },
    editTaskfn(task) {
      this.editTask = task;
    },
    onSubmitUpdate(evt) {
      evt.preventDefault();
      this.$refs.editTaskModal.hide();
      const payload = {
        name: this.editTask.name,
        description: this.editTask.description,
        status: this.editTask.status,
      };
      this.updateTask(payload, this.editTask._id);
    },
    updateTask(payload, taskId) {
      const path = `${host}/tasks/${taskId}`;
      axios.put(path, payload)
        .then(() => {
          this.getTasks();
          this.message = 'Task updated';
          this.showMessage = true;
        }).catch(() => {
          this.getTasks();
        });
    },
    onResetUpdate(evt) {
      evt.preventDefault();
      this.$refs.editTaskModal.hide();
      this.initForm();
      this.getTasks();
    },
    onDeleteTask(task) {
      /* eslint no-underscore-dangle: 0 */
      this.removeTask(task._id);
    },
    removeTask(taskId) {
      const path = `${host}/tasks/${taskId}`;
      axios.delete(path).then(() => {
        this.getTasks();
        this.message = 'Task removed';
        this.showMessage = true;
      }).catch(() => {
        this.getTasks();
      });
    },
  },
  created() {
    this.getTasks();
  },
};
</script>

<style>

</style>
