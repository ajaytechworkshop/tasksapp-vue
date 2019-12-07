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
              <th scope="col">Date</th>
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Done?</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Develop</td>
              <td>Keep Developing</td>
              <td>Developing</td>
              <td>
                <div class="btn-group" role="group">
                  <button type="button" class="btn btn-info btn-sm">Edit</button>
                  <button type="button" class="btn btn-danger btn-sm">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {

};
</script>

<style>

</style>
