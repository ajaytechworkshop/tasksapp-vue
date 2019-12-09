<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-10">
        <h1>Tasks</h1>
        <hr><br><br>
        <button type="button" class="btn btn-success btn-sm">New Tasks</button>
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
    <b-modal ref="addTaskModal">

    </b-modal>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: [],
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
  },
  created() {
    this.getTasks();
  },
};
</script>

<style>

</style>
