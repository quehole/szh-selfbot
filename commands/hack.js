module.exports = {

    name: 'hack',

    description: 'Simulates a prank hack.',

    cooldown: 5,

    /**

     * Executes the prankhack command.

     * 

     * @param {Channel} channel The channel where the command was executed.

     * @param {Message} message The message object for the command.

     * @param {Client} client The client or bot instance.

     * @param {String[]} args The arguments passed with the command.

     */

    execute(channel, message, client, args) {
        message.delete().catch(console.error);

        const steps = [

            'Hack initiated... Accessing mainframe...',

            'Bypassing firewalls...',

            'Cracking encryption...',

            'Injecting malware...',

            'Gathering sensitive data...',

            'Uploading data to secure server...',

            'Deleting traces of hack...',

            'Successfully compromised.'


        ];

        let stepIndex = 0;

        const sendStep = () => {

            if (stepIndex < steps.length) {

                message.channel.send(steps[stepIndex]);

                stepIndex++;

                // Random delay between 1 to 3 seconds for each step

                const delay = Math.floor(Math.random() * 2000) + 1000;

                setTimeout(sendStep, delay);

            }

        };

        sendStep();

    }

};