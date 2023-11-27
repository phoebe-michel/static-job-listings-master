var vm = new Vue({
  el: "#app",
  data: {
    jobList: [],
    jobFilters: [],
  },
  async created() {
    await this.loadDataFromJson();
  },
  methods: {
    loadDataFromJson: async function () {
      await fetch("./data.json")
        .then(async (response) => {
          this.jobList = await response.json();
        })
        .catch((error) => console.log(error));
    },
    addFilter: function (filter) {
      var filterExists = this.jobFilters.includes(filter);
      if (!filterExists) {
        this.jobFilters.push(filter);
      }
    },
    removeFilter: function (filter) {
      var jfIndex = this.jobFilters.indexOf(filter);
      this.jobFilters.splice(jfIndex, 1);
    },
    clearAllFilters: function () {
      while (this.jobFilters.length > 0) {
        this.jobFilters.pop();
      }
    },
  },

  computed: {
    filteredJobList: function () {
      return this.jobList.filter((job) => {
        let items = [job.role, job.level, ...job.languages, ...job.tools];
        let filters = this.jobFilters;
        return filters.every((filter) => items.includes(filter));
      });
    },
  },
});
