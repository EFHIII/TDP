# Top Down Platformer
To play, go [here](https://efhiii.github.io/TDP)

[Discord server](https://discord.gg/YgpHJEH)

## Controls
`ARROW KEYS` - move

`SPACE` - jump / double jump

`Z` - (hold) charged boost (activates when hitting the ground/wall)

`X` - brief boost (has a cooldown)

`R` - restart level

`S` - skip level

`ENTER` - continue to next level (after finishing a level)

# FAQ
***It's really laggy, how do I fix this?***
There are a few reasons why the game might be running slow, here's a list of the ones I know and how to fix them.

### Hardware acceleration is disabled
In Google Chrome, and other browsers, you can disable Hardware acceleration. This will force the game to run on your CPU, which is not well suited to real time 3D graphics, and thus will likely result in poor performance.
This can be fixed simply by enabling Hardware acceleration. For chrome, this can be done at chrome://settings/system

### The Default graphics card is not your main graphics card
I don't know why you'd ever want this, but for some reason Edge does this by default. This should only be an issue if you have multiple graphics cards, but many computers do, including my laptop.

In Windows, you can fix this by going into `Windows settings`, clicking `System`, and under `Display`, scrolling down and clicking `Graphics settings`. For Edge, in the first drop down, select `Universal app`, and in the `Select an app` drop down, select Microsoft edge (for any other browser, you'd choose Classic app, and have to find the exe file). Then click on it and click `Options`, select `High performance`, and Save.

### Background apps are consuming other resources
If your computer is already making use of its resources in other applications, then, as you might expect, this game's performance will suffer. The obvious solution is to close those other applications.

### You don't have a good graphics cards
This is a bit trickier to solve, but you shouldn't assume this to be the problem immediately; look for other potential causes. I've tested the game on my smart phone, and it runs at a clean 60 FPS, so you'd need a potato of a computer to be suffering. If, however, you are suffering, the obvious solution is to either use a more powerful device, or get a better graphics card for your current device.

## TODO
- Main menu
- level select UI
- configure settings
  - remap controls
  - disable anti-aliasing
  - full screen
  - 30/60 FPS
- game elements
  - checkpoints
  - falling platforms?
  - moving platforms?
  - deadly-to-touch elements
  - different elevation platforms
- Save cookie of levels passed and replays
- make levels
- make TAS mode
