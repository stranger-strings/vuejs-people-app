/* global Vue, VueRouter, axios */

var HomePage = {
  template: "#home-page",
  data: function() {
    return {
      message: "Welcome to Vue.js!",
      people: [],
      newPerson: { name: "", bio: "", bioVisible: true },
      errors: []
    };
  },
  mounted: function() {
    axios.get("/v1/people").then(
      function(response) {
        this.people = response.data;
      }.bind(this)
    );
  },
  methods: {
    createPerson: function() {
      var params = { name: this.newPerson.name, bio: this.newPerson.bio };
      axios
        .post("/v1/people", params)
        .then(
          function(response) {
            this.people.push(response.data);
            this.newPerson = { name: "", bio: "", bioVisible: true };
            this.errors = [];
          }.bind(this)
        )
        .catch(
          function(error) {
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    deletePerson: function(inputPerson) {
      var index = this.people.indexOf(inputPerson);
      this.people.splice(index, 1);
    },
    toggleBio: function(inputPerson) {
      inputPerson.bioVisible = !inputPerson.bioVisible;
    }
  },
  computed: {}
};

var router = new VueRouter({
  routes: [{ path: "/", component: HomePage }]
});

var app = new Vue({
  el: "#app",
  router: router
});
