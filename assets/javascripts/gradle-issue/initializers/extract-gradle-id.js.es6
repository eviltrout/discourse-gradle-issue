export default {
  name: "extract-gradle-id",
  initialize(container) {
    const TopicController = container.lookupFactory("controller:topic");

    TopicController.reopen({
      gradleBugId: function () {
        const tags = this.get("tags") || [];
        const bugTag = tags.find((t) => /^gradle\-\d+$/i.test(t));

        if (bugTag) {
          return bugTag.toUpperCase();
        }
      }.property("tags.@each"),

      gradleBugUrl: function () {
        return "http://issues.gradle.org/browse/" + this.get("gradleBugId");
      }.property("gradleBugId"),
    });
  },
};
