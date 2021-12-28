from opentrons import simulate

protocol = simulate.get_protocol_api("2.11")
protocol.home()
