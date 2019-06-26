require 'carrierwave/storage/abstract'
require 'carrierwave/storage/file'
require 'carrierwave/storage/fog'

CarrierWave.configure do |config|
  config.storage = :fog
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider: 'AWS',
    aws_access_key_id: Rails.application.secrets.aws_access_key_id, #大事！secrets.ymlに設定してそこから参照
    aws_secret_access_key: Rails.application.secrets.aws_secret_access_key,
    region: 'ap-northeast-1' #アジアパシフィック（東京）の場合
  }

  config.fog_directory  = 'upload-for-chat-space'
  config.asset_host = 'https://s3-ap-northeast-1.amazonaws.com/upload-for-chat-space'
end