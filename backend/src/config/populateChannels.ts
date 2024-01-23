import Channel from "../models/channelModel";

// Function to check if channels are already populated
async function areChannelsPopulated() {
  const count = await Channel.countDocuments();
  return count > 0;
}

// Function to populate channels
export const populateInitialChannels = async () => {
  const channelsData = [{ name: "general" }];

  try {
    const channelsAlreadyPopulated = await areChannelsPopulated();

    if (!channelsAlreadyPopulated) {
      // Delete existing channels to start with a clean slate
      await Channel.deleteMany();

      // Create new channels
      await Channel.insertMany(channelsData);

      console.log("Channels populated successfully");
    } else {
      console.log("Channels are already populated. Skipping...");
    }
  } catch (error) {
    console.error("Error populating channels:", error);
  }
};
