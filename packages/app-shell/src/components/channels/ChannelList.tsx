import * as React from "react";

import { Box, Flex, Panel, H2, Button, Lozenge } from "@bigcommerce/big-design";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { Channel } from "../../models/Channel";

import { ChannelListMenu } from "./ChannelListMenu";
import { ChannelListHeader } from "./ChannelListHeader";
import { ChannelDetailViewModal } from "./ChannelDetailViewModal";
import { ChannelEditModal } from "./ChannelEditModal";
import { ChannelCreateModal } from "./ChannelCreateModal";

import logo from "../../assets/Storefront.svg";
import { Link } from "react-router-dom";

interface ChannelListProperties {
  channels: Array<Channel>;
}

export const ChannelList: React.FC<ChannelListProperties> = props => {
  const [isViewChannelDetailsOpen, setViewChannelDetailsOpen] = React.useState(
    false
  );

  const [isEditChannelOpen, setEditChannelOpen] = React.useState(false);
  const [isCreateChannelOpen, setCreateChannelOpen] = React.useState(false);

  const [channelDetails, setChannelDetails] = React.useState();

  const openViewDetails = (channel: Channel) => {
    setViewChannelDetailsOpen(true);
    setChannelDetails(channel);
  };

  const closeViewDetails = () => {
    setViewChannelDetailsOpen(false);
  };

  const openEdit = (channel: Channel) => {
    setEditChannelOpen(true);
    setChannelDetails(channel);
  };

  const closeEdit = () => {
    setEditChannelOpen(false);
  };

  const openCreate = (channel: Channel) => {
    setCreateChannelOpen(true);
  };

  const closeCreate = () => {
    setCreateChannelOpen(false);
  };

  // var groupBy = function(xs, key) {
  //   return xs.reduce(function(rv, x) {
  //     (rv[x[key]] = rv[x[key]] || []).push(x);
  //     return rv;
  //   }, {});
  // };

  const filterByType = (type: string): Array<Channel> => {
    return props.channels.reduce((accum: Array<Channel>, ele: Channel) => {
      if (ele.type === type) {
        accum.push(ele);
      }
      return accum;
    }, []);
  };

  // const renderChannelList = () => {
  //   return props.channels.map((channel: Channel) => {
  //     return (
  //       <Box
  //         key={channel.id}
  //         borderBottom="box"
  //         borderLeft="box"
  //         borderRight="box"
  //         backgroundColor="white"
  //       >
  //         <Flex justifyContent="left">
  //           <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
  //             <Box style={{ lineHeight: "36px" }}>{channel.name}</Box>{" "}
  //           </Flex.Item>
  //           <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
  //             <Box style={{ lineHeight: "36px" }}>{channel.platform}</Box>
  //           </Flex.Item>{" "}
  //           <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
  //             <Box style={{ lineHeight: "36px" }}>{channel.type}</Box>
  //           </Flex.Item>
  //           <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
  //             <Flex justifyContent="left">
  //               <Flex.Item>
  //                 <Box style={{ lineHeight: "36px" }}>
  //                   {channel.external_id}
  //                 </Box>
  //               </Flex.Item>
  //             </Flex>
  //           </Flex.Item>
  //           <Flex.Item margin="small" style={{ height: 36, width: "18%" }}>
  //             <Flex justifyContent="center">
  //               <Flex.Item>
  //                 <Box style={{ lineHeight: "36px" }}>
  //                   {channel.is_enabled ? (
  //                     <FontAwesomeIcon icon={faCheck} />
  //                   ) : (
  //                     <FontAwesomeIcon icon={faTimes} />
  //                   )}
  //                 </Box>
  //               </Flex.Item>
  //             </Flex>
  //           </Flex.Item>
  //           <Flex.Item margin="small" style={{ height: 36, width: "10%" }}>
  //             <Flex justifyContent="right">
  //               <Flex.Item margin="none">
  //                 <ChannelListMenu
  //                   viewDetailsAction={() => {
  //                     openViewDetails(channel);
  //                   }}
  //                   editAction={() => {
  //                     openEdit(channel);
  //                   }}
  //                 />
  //               </Flex.Item>
  //             </Flex>
  //           </Flex.Item>
  //         </Flex>
  //       </Box>
  //     );
  //   });
  // };

  const renderChannelList = (channelList: Array<Channel>) => {
    return channelList.map((channel: Channel) => {
      return (
        <Box
          key={channel.id}
          borderBottom="box"
          borderLeft="none"
          borderRight="none"
          backgroundColor="white"
        >
          <Flex justifyContent="center" alignItems="center">
            <Flex.Item margin="small">
              <img height="24" src={logo} alt="Storefront Channel Logo Image" />
            </Flex.Item>
            <Flex.Item margin="small" grow={1}>
              <Box style={{ lineHeight: "36px" }}>{channel.name}</Box>{" "}
            </Flex.Item>

            <Flex.Item marginHorizontal="medium">
              {channel.is_enabled ? (
                <Lozenge variant="success">Active</Lozenge>
              ) : (
                <Lozenge variant="secondary">Inactive</Lozenge>
              )}
            </Flex.Item>

            <Flex.Item marginHorizontal="large">
              <Link to={{ pathname: "/channel/", state: { channel: channel } }}>
                <Button variant="secondary">
                  <FontAwesomeIcon icon={faEllipsisH} />
                </Button>
              </Link>
            </Flex.Item>
          </Flex>
        </Box>
      );
    });
  };

  filterByType("storefront");

  return (
    // <Box margin="none">
    //   <ChannelListHeader createAction={openCreate} />
    //   <ChannelDetailViewModal
    //     isOpen={isViewChannelDetailsOpen}
    //     closeAction={closeViewDetails}
    //     channelData={channelDetails}
    //   />

    //   <ChannelEditModal
    //     isOpen={isEditChannelOpen}
    //     closeAction={closeEdit}
    //     channelData={channelDetails}
    //   />

    //   <ChannelCreateModal
    //     isOpen={isCreateChannelOpen}
    //     closeAction={closeCreate}
    //   />

    //   <Box>{renderChannelList()}</Box>
    // </Box>
    <Box marginVertical="xxxLarge" marginHorizontal="none">
      <Panel>
        <Flex justifyContent="space-between">
          <H2>Storefronts</H2>
        </Flex>
        {/* Do as effect */}
        {renderChannelList(filterByType("storefront"))}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Marketplaces</H2>
        </Flex>
        {renderChannelList(filterByType("marketplace"))}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Point of Sale (POS)</H2>
        </Flex>
        {renderChannelList(filterByType("pos"))}
      </Panel>

      <Panel>
        <Flex justifyContent="space-between">
          <H2>Marketing</H2>
        </Flex>
        {renderChannelList(filterByType("marketing"))}
      </Panel>
    </Box>
  );
};
