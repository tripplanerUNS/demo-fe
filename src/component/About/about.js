import React from "react";
import "./about.css";
import Baliawesome1 from "../../Assets/BALI - awesome waterfalls near UBUD1.jpeg";

function About() {
  return (
        <div className="tentang-kami">
          <div className="text-wrapper">Tentang Kami</div>
          <div className="content">
            <div className="row">
            <div className="image-container">
              <img className="img" alt={Baliawesome1} src={Baliawesome1} />
             
            </div>
            <div className="description">
              <p className="div">
                Kami adalah sebuah tim yang berdedikasi untuk memberikan pengalaman perjalanan yang tak terlupakan kepada
                setiap pelanggan kami. Dengan lebih dari sepuluh tahun pengalaman dalam industri perjalanan, kami telah
                menjadi mitra yang tepercaya bagi mereka yang mencari petualangan, kenyamanan, dan inspirasi. Kami percaya
                bahwa setiap perjalanan adalah sebuah cerita yang unik, dan kami berkomitmen untuk menyediakan layanan yang
                dapat disesuaikan dengan kebutuhan dan keinginan setiap pelanggan kami.
              </p>
              <p className="p">
                Di dalam perjalanan kami, kami tidak hanya menawarkan destinasi indah dan akomodasi yang nyaman, tetapi juga
                menyediakan pengalaman lokal yang autentik dan aktivitas yang menginspirasi. Dari petualangan alam yang
                menantang hingga keindahan budaya yang memukau, kami menghadirkan beragam pilihan untuk memenuhi berbagai
                minat dan preferensi. Dengan keragaman destinasi yang kami tawarkan, setiap pelanggan kami dapat menemukan
                petualangan yang sesuai dengan impian mereka.
              </p>
              <p className="text-wrapper-2">
                Kami bangga menjadi bagian dari perjalanan hidup Anda dan berkomitmen untuk memberikan pengalaman yang tak
                terlupakan setiap kali Anda memilih kami sebagai mitra perjalanan Anda. Dengan dukungan tim profesional kami
                dan layanan pelanggan yang responsif, kami berusaha untuk menjadikan setiap perjalanan Anda mengesankan,
                mulai dari perencanaan hingga pulang ke rumah. Bersama kami, mari jelajahi dunia, menciptakan kenangan yang
                akan bertahan seumur hidup.
              </p>
            </div>
            </div>
          </div>
        </div>
  );
}

export default About;