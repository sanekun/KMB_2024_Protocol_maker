# For Streamlit Web Application.

FROM ubuntu:20.04

# Only for korea
RUN sed -i 's/archive.ubuntu.com/mirror.kakao.com/g' /etc/apt/sources.list

# APT
RUN apt-get update \
    && apt-get install -y git vim curl


# install python3.10

RUN apt install -yq software-properties-common
RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt update
RUN apt install -y python3.10

# install pip
RUN curl -sS https://bootstrap.pypa.io/get-pip.py | python3.10

# install python requirement
RUN python3.10 -m pip install numpy pandas streamlit streamlit_ace

RUN git clone github.com/Lelp27/automated-protocol-ot2

# Clean
RUN apt clean
RUN apt auto-clean


# .bashrc
RUN mkdir /home/dev
RUN echo "export LS_COLORS='di=00;36:fi=00;37'" >> ~/.bashrc
RUN echo "cd /home/dev" >> ~/.bashrc
