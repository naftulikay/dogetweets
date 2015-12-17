# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.box = "ubuntu-14.04-amd64-vbox"
  config.vm.box_url = "https://oss-binaries.phusionpassenger.com/vagrant/boxes/latest/ubuntu-14.04-amd64-vbox.box"

  config.vm.synced_folder ".", "/vagrant", type: "rsync",
    rsync__args: ["-avz", "--delete", "--filter", ":- .gitignore", "--copy-links"],
    rsync__exclude: [".git", ".vagrant", "node_modules"]

  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "vagrant.yml"
  end
end
