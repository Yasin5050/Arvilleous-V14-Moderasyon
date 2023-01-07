const { EmbedBuilder } = require("discord.js");

function handleLogs(client) {
    const logSchema = require("../Models/Logs");

    function send_log(guildId, arvsembed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data || !data.Channel) return;
            const LogKanal = client.channels.cache.get(data.Channel);
            
            if(!LogKanal) return;
            
            try {
            LogKanal.send({ embeds: [arvsembed] });
            } catch(err) {
                console.log(err);
            }
        });
    }

    client.on("messageDelete", function (mesaj) {
        if (mesaj.author.bot) return;

        const arvs1embed = new EmbedBuilder()
            .setTitle('Mesaj Silindi')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`
            **Sahip : ** <@${mesaj.author.id}> (${mesaj.author.tag})
            **Tarih : ** ${mesaj.createdAt}
            **Kanal : ** <#${mesaj.channel.id}> (${mesaj.channel.name})
            **Silinen Mesaj : **\`${mesaj.content.replace(/`/g, "'")}\`
         `);

        return send_log(mesaj.guild.id, arvs1embed);
    });

    client.on("guildChannelTopicUpdate", (Kanal, EskiKonu, YeniKonu) => {

        const arvs2embed = new EmbedBuilder()
            .setTitle('Konu Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`${Kanal} Kanalının **${EskiKonu}** Olan Konusu **${YeniKonu}** İle Değiştirildi`);

        return send_log(Kanal.guild.id, arvs2embed);

    });

    client.on("guildChannelPermissionsUpdate", (Kanal, Eskizinler, Yenizinler) => {

        const arvs3embed = new EmbedBuilder()
            .setTitle('Kanal İzinleri Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kanal.name + 'Adlı Kanalın İzinleri Güncellendi');

        return send_log(Kanal.guild.id, arvs3embed);

    })

    client.on("unhandledGuildChannelUpdate", (EskiKanal, YeniKanal) => {

        const arvs4embed = new EmbedBuilder()
            .setTitle('Kanal Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(EskiKanal.id + "Adlı Kanal Düzenlendi Fakat discord-logs Neyin Güncellendiğini Bulamadı...");

        return send_log(EskiKanal.guild.id, arvs4embed);

    });

    client.on("guildMemberBoost", (üye) => {

        const arvs5embed = new EmbedBuilder()
            .setTitle('Boost Basıldı')
            .setColor(0xff05e2)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**${üye.user.tag}** Adlı Üye Sunucumuza (${üye.guild.name}) Takviye Bastı `);
        return send_log(üye.guild.id, arvs5embed);

    })

    client.on("guildMemberUnboost", (üye) => {

        const arvs6embed = new EmbedBuilder()
            .setTitle('Boost Geri Çekildi')
            .setColor(0xff05e2)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**${üye.user.tag}** Adlı Üye Sunucumuza (${üye.guild.name}) Bastığı Takviyeyi Geri Çekti`);

        return send_log(üye.guild.id, arvs6embed);

    })

    client.on("guildMemberRoleAdd", (üye, rol) => {

        const arvs7embed = new EmbedBuilder()
            .setTitle('Rol Eklendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**${üye.user.tag}** Adlı Üyeye \`${rol.name}\` Rolü Eklendi`);

        return send_log(üye.guild.id, arvs7embed);

    })

    client.on("guildMemberRoleRemove", (üye, rol) => {

        const arvs8embed = new EmbedBuilder()
            .setTitle('Rol Kaldırıldı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**${üye.user.tag}** Adlı Üyenin \`${rol.name}\` Rolü Kaldırıldı`);

        return send_log(üye.guild.id, arvs8embed);

    })

    client.on("guildMemberNicknameUpdate", (üye, EskiKullanıcıAdı, YeniKullanıcıAdı) => {

        const arvs9embed = new EmbedBuilder()
            .setTitle('Kullanıcı Adı Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`${üye.user.tag} Adlı Üye \`${EskiKullanıcıAdı}\` Olan İsmini \`${YeniKullanıcıAdı}\` İsmiyle Değiştirdi`);

        return send_log(üye.guild.id, arvs9embed);
    })

    client.on("guildMemberAdd", (Üye) => {

        const arvs10embed = new EmbedBuilder()
            .setTitle('Kullanıcı Sunucuya Katıldı')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Üye: ${Üye.user} (\`${Üye.user.id}\`) \n\`${Üye.user.tag}\``,
                Üye.user.displayAvatarURL({ dynamic: true }));

        return send_log(Üye.guild.id, arvs10embed);

    });

    client.on("guildMemberRemove", (Üye) => {

        const arvs11embed = new EmbedBuilder()
            .setTitle('Kullanıcı Sunucudan Ayrıldı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Üye: ${Üye.user} (\`${Üye.user.id}\`) \n\`${Üye.user.tag}\``,
                Üye.user.displayAvatarURL({ dynamic: true }));

        return send_log(Üye.guild.id, arvs11embed);

    });

    client.on("guildBoostLevelUp", (Sunucu, EskiSeviye, YeniSeviye) => {

        const arvs12embed = new EmbedBuilder()
            .setTitle('Boost Seviyesi Yükseldi')
            .setColor(0xff05e2)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Sunucu (${Sunucu.name})  ${YeniSeviye}. Seviye Takviyeye Ulaştı`);

        return send_log(Sunucu.id, arvs12embed);

    })

    client.on("guildBoostLevelDown", (Sunucu, EskiSeviye, YeniSeviye) => {

        const arvs13embed = new EmbedBuilder()
            .setTitle('Boost Seviyesi Düştü')
            .setColor(0xff05e2)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Sunucu (${Sunucu.name}) ${EskiSeviye}. Seviye Takviyeden ${YeniSeviye}. Seviye Takviyeye Düştü`);

        return send_log(Sunucu.id, arvs13embed);

    })

    client.on("guildBannerAdd", (Sunucu, AfişURL) => {

        const arvs14embed = new EmbedBuilder()
            .setTitle('Sunucuya Banner Eklendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setImage(AfişURL)

        return send_log(Sunucu.id, arvs14embed);

    })

    client.on("guildAfkChannelAdd", (Sunucu, AFKanal) => {

        const arvs15embed = new EmbedBuilder()
            .setTitle('AFK Kanalı Eklendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Sunucunun (${Sunucu.name}) Yeni AFK Kanalı ${AFKanal} Olarak Ayarlandı`);

        return send_log(Sunucu.id, arvs15embed);

    })

    client.on("guildVanityURLAdd", (Sunucu, ÖzelURL) => {

        const arvs16embed = new EmbedBuilder()
            .setTitle('Özel URL Eklendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Sunucunun (${Sunucu.name}) URL'si ${ÖzelURL} Olarak Güncellendi`);

        return send_log(Sunucu.id, arvs16embed);

    })

    client.on("guildVanityURLRemove", (Sunucu, ÖzelURL) => {

        const arvs17embed = new EmbedBuilder()
            .setTitle('Özel URL Kaldırıldı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Sunucunun (${Sunucu.name}) URL'si ${ÖzelURL} Kaldırıldı`);

        return send_log(Sunucu.id, arvs17embed);

    })

    client.on("guildVanityURLUpdate", (Sunucu, EskiÖzelURL, YeniÖzelURL) => {

        const arvs18embed = new EmbedBuilder()
            .setTitle('Özel URL Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Sunucunun (${Sunucu.name}) URL'si ${EskiÖzelURL} Olan URL ${YeniÖzelURL} İle Değiştirildi`);

        return send_log(Sunucu.id, arvs18embed);

    })

    client.on("messagePinned", (Mesaj) => {

        const arvs19embed = new EmbedBuilder()
            .setTitle('Mesaj Sabitlendi')
            .setColor(0xa8a7a8)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`${Mesaj.author} Tarafından (${Mesaj}) Sabtilendi`);

        return send_log(Mesaj.guild.id, arvs19embed);

    })

    client.on("messageContentEdited", (Mesaj, EskiMesaj, YeniMesaj) => {

        const arvs20embed = new EmbedBuilder()
            .setTitle('Mesaj Düzenlendi')
            .setColor(0xa8a7a8)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`${Mesaj.author} Tarafından Yazılan \`${EskiMesaj}\`, \`${YeniMesaj}\` Olarak Düzenlendi`);

        return send_log(Mesaj.guild.id, arvs20embed);

    })

    client.on("rolePermissionsUpdate", (Rol, Eskizinler, Yenizinler) => {

        const arvs22embed = new EmbedBuilder()
            .setTitle('Rol İzinleri Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Rol.name + " İsimli Rolün " + Eskizinler + " 'i " + Yenizinler + " 'le Güncellendi ");

        return send_log(Rol.guild.id, arvs22embed);

    })
    
    client.on("userUsernameUpdate", (Üye, EskiKullanıcıAdı, YeniKullanıcıAdı) => {

        const arvs23embed = new EmbedBuilder()
            .setTitle('Kullanıcı Adı Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`${Üye.tag}, ${EskiKullanıcıAdı} Olan Kullanıcı Adını ${YeniKullanıcıAdı} İle Değiştirdi`);

        return send_log(Üye.guild.id, arvs23embed);

    })

    client.on("userDiscriminatorUpdate", (Üye, EskiSayıları, YeniSayıları) => {

        const arvs24embed = new EmbedBuilder()
            .setTitle('Son Dört Rakam Güncellendi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
                .setDescription(`${Üye.tag}, ${EskiSayıları} Olan Son Dört Rakamını ${YeniSayıları} İle Değiştirdi`);

        return send_log(Üye.guild.id, arvs24embed);

    })

    client.on("voiceChannelJoin", (Kullanıcı, Kanal) => {

        const arvs25embed = new EmbedBuilder()
            .setTitle('Ses Kanalına Katınıldı')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + ", Ses Kanalına " + `(${Kanal})` + " Girdi ");

        return send_log(Kullanıcı.guild.id, arvs25embed);

    })

    client.on("voiceChannelLeave", (Kullanıcı, Kanal) => {

        const arvs26embed = new EmbedBuilder()
            .setTitle('Ses Kanalından Çıkıldı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + ", Ses Kanalından " + `(${Kanal})` + " Ayrıldı ");

        return send_log(Kullanıcı.guild.id, arvs26embed);

    })

    client.on("voiceChannelSwitch", (Kullanıcı, EskiKanal, YeniKanal) => {

        const arvs27embed = new EmbedBuilder()
            .setTitle('Ses Kanalı Değiştirildi')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + ", Eski Ses Kanalından " + EskiKanal.name + " Ayrılıp Yeni " + YeniKanal.name + " Ses Kanalına Girdi ");

        return send_log(Kullanıcı.guild.id, arvs27embed);

    })

    client.on("voiceChannelMute", (Kullanıcı, SusturmaTürü) => {

        const arvs28embed = new EmbedBuilder()
            .setTitle('Ses Kanalında Susturuldu')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Adlı Üye Ses Kanalında Susturuldu (Tür: " + SusturmaTürü + ")");

        return send_log(Kullanıcı.guild.id, arvs28embed);

    })

    client.on("voiceChannelUnmute", (Kullanıcı, EskiSusturmaTürü) => {

        const arvs29embed = new EmbedBuilder()
            .setTitle('Ses Kanalındaki Susturması Kaldırıldı')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Adlı Üyenin Ses Kanalındaki Susturması Açıldı");

        return send_log(Kullanıcı.guild.id, arvs29embed);

    })

    client.on("voiceChannelDeaf", (Kullanıcı, SağırlaştırmaTürü) => {

        const arvs30embed = new EmbedBuilder()
            .setTitle('Ses Kanalında Sağırlaştırıldı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Adlı Üye Ses Kanalında Sağırlaştırıldı");

        return send_log(Kullanıcı.guild.id, arvs30embed);

    })

    client.on("voiceChannelUndeaf", (Kullanıcı, SağırlaştırmaTürü) => {

        const arvs31embed = new EmbedBuilder()
            .setTitle('Ses Kanalında Sağırlaştırılması Kaldırıldı')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Adlı Üye Ses Kanalındaki Sağırlaştırılması Kaldırıldı");

        return send_log(Kullanıcı.guild.id, arvs31embed);

    })

    client.on("voiceStreamingStart", (Kullanıcı, SesKanalı) => {


        const arvs32embed = new EmbedBuilder()
            .setTitle('Ses Kanalında Yayın Açıldı')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Adlı Üye " + SesKanalı.name + " Kanalında Yayın Açtı");

        return send_log(Kullanıcı.guild.id, arvs32embed);

    })

    client.on("voiceStreamingStop", (Kullanıcı, SesKanalı) => {


        const arvs33embed = new EmbedBuilder()
            .setTitle('Ses Kanalındaki Yayın Kapatıldı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Adlı Üye " + SesKanalı.name + " Kanalında Açtığı Yayını Kapattı");

        return send_log(Kullanıcı.guild.id, arvs33embed);
    });

    client.on("guildMemberOffline", (Kullanıcı, EskiDurum) => {

        const arvs34embed = new EmbedBuilder()
            .setTitle("Çevrimdışı Oldu")
            .setColor(0x2F3136)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Çevrimdışı Oldu");

        return send_log(Kullanıcı.guild.id, arvs34embed);

    });

    client.on("guildMemberOnline", (Kullanıcı, YeniDurum) => {

        const arvs35embed = new EmbedBuilder()
            .setTitle("Çevrimiçi Oldu")
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(Kullanıcı.user.tag + " Çevrimiçi Oldu");

        return send_log(Kullanıcı.guild.id, arvs35embed);

    });

    client.on("roleCreate", (Rol) => {

        const arvs36embed = new EmbedBuilder()
            .setTitle('Yeni Rol Oluşturuldu')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**Oluşturulan Rol:** ${Rol} \n**Rolün Adı:** ${Rol.name} \n**Rol ID:** ${Rol.id} \n**HEX Kodu:** ${Rol.hexColor} \n**Pozisyonu:** ${Rol.position}`);

        return send_log(Rol.guild.id, arvs36embed);

    });

    client.on("roleDelete", (Rol) => {

        const arvs37embed = new EmbedBuilder()
            .setTitle('Rol Silindi')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**Silinen Rol:** ${Rol} \n**Rolün Adı:** ${Rol.name} \n**Rol ID:** ${Rol.id} \n**HEX Kodu:** ${Rol.hexColor} \n**Pozisyonu:** ${Rol.position}`);

        return send_log(Rol.guild.id, arvs37embed);

    });

    client.on("guildBanAdd", ({Sunucu, Kullanıcı}) => {

        const arvs38embed = new EmbedBuilder()
            .setTitle('Üye Yasaklandı')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**Yasaklanan Üye:** ${Kullanıcı} (\`${Kullanıcı.id}\`) \n\`${Kullanıcı.tag}\``,
                Kullanıcı.displayAvatarURL({ dynamic: true }));

        return send_log(Sunucu.id, arvs38embed);

    });

    client.on("guildBanRemove", ({Sunucu, Kullanıcı}) => {

        const arvs39embed = new EmbedBuilder()
            .setTitle('Üyenin Yasağı Kaldırıldı')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`**Kaldırılan Üye:** ${Kullanıcı} (\`${Kullanıcı.id}\`) \n\`${Kullanıcı.tag}\``,
                Kullanıcı.displayAvatarURL({ dynamic: true }));

        return send_log(Sunucu.id, arvs39embed);

    });

    client.on("channelCreate", (Kanal) => {

        const arvs40embed = new EmbedBuilder()
            .setTitle('Yeni Kanal Oluşturuldu')
            .setColor(0x03fc17)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`Yeni Kanal (${Kanal.name}) Oluşturuldu`);

        return send_log(Kanal.guild.id, arvs40embed);

    });

    client.on("channelDelete", (Kanal) => {

        const arvs41embed = new EmbedBuilder()
            .setTitle('Kanal Silindi')
            .setColor(0xfc0303)
            .setFooter({ text: "Made by ❤️ ArviS#0011" })
            .setDescription(`${Kanal.name} İsimli Kanal Silindi`);

        return send_log(Kanal.guild.id, arvs41embed);

    });
}

module.exports = { handleLogs };