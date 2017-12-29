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

    var places = [];

    var uluru = { lat: -25.363, lng: 131.044 };
    var map = new google.maps.Map(document.getElementById("map"), {
      zoom: 4,
      center: uluru
    });

    var contentString =
      '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
      "sandstone rock formation in the southern part of the " +
      "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
      "south west of the nearest large town, Alice Springs; 450&#160;km " +
      "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
      "features of the Uluru - Kata Tjuta National Park. Uluru is " +
      "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
      "Aboriginal people of the area. It has many springs, waterholes, " +
      "rock caves and ancient paintings. Uluru is listed as a World " +
      "Heritage Site.</p>" +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>";

    var infowindow = new google.maps.InfoWindow({
      content: contentString
    });

    var marker = new google.maps.Marker({
      position: uluru,
      map: map,
      title: "Uluru (Ayers Rock)"
    });
    marker.addListener("click", function() {
      infowindow.open(map, marker);
    });
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
