/* global Vue, VueRouter, axios, google */

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

    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru
    });

    var places = [
      { lat: -25.363, lng: 131.044, description: "A place in Australia" },
      { lat: -33.8675, lng: 151.207, description: "The main city!" }
    ];

    places.forEach(function(place) {
      var infowindow = new google.maps.InfoWindow({
        content: place.description
      });

      var marker = new google.maps.Marker({
        position: { lat: place.lat, lng: place.lng },
        map: map,
        title: "Place"
      });
      marker.addListener("click", function() {
        infowindow.open(map, marker);
      });
    });

    // for (var i = 0; i < places.length; i++) {
    //   let infowindow = new google.maps.InfoWindow({
    //     content: places[i].description
    //   });

    //   let marker = new google.maps.Marker({
    //     position: { lat: places[i].lat, lng: places[i].lng },
    //     map: map,
    //     title: "Place"
    //   });
    //   marker.addListener("click", function() {
    //     infowindow.open(map, marker);
    //   });
    // }
  },
  methods: {
    uploadFile: function(event) {
      if (event.target.files.length > 0) {
        var formData = new FormData();
        formData.append("name", this.newPerson.name);
        formData.append("bio", this.newPerson.bio);
        formData.append("image", event.target.files[0]);

        axios.post("/v1/people", formData).then(function(response) {
          console.log(response);
          this.newPerson = { name: "", bio: "", bioVisible: true };
          event.target.value = "";
        });
      }
    },

    // createPerson: function() {
    //   var params = { name: this.newPerson.name, bio: this.newPerson.bio };
    //   axios
    //     .post("/v1/people", params)
    //     .then(
    //       function(response) {
    //         this.people.push(response.data);
    //         this.newPerson = { name: "", bio: "", bioVisible: true };
    //         this.errors = [];
    //       }.bind(this)
    //     )
    //     .catch(
    //       function(error) {
    //         this.errors = error.response.data.errors;
    //       }.bind(this)
    //     );
    // },
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
